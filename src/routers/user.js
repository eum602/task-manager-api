const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const upload = multer({
    dest:'avatars',
    limits: {
        fileSize: 1000000, //max 1MB
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            cb(new Error('please only upload jpg, jpeg and png file extensions'))
        }
        cb(undefined,true)
    }
})
const router = new express.Router()


// router.get('/test', (req,res)=>{
//     res.send("from a new file")
// })

router.post('/users',async(req,res)=>{
    const user = new User(req.body);
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req,res)=>{
    try {
        const {email,password}=req.body
        const user = await User.findByCredentials(email,password) //implementeed in user in models
        const token = await user.generateAuthToken() //to generate token; //implementeed in user in models
        //res.send({user:user.getPublicProfile(),token})
        res.send({user,token}) //by using res.send we are implicitly calling the JSON.stringify over user and token
        //so the toJSON method setted on user/model is fired and it returns only what is allowed to.
    }catch(e){
        res.status(400).send()
    }
})

router.post('/users/logout',auth,async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter(token=>{
            return token.token!==req.token
        })//with this we are deleting the token that owns the user in one of the accounts
        //but still have other tokens untouched so that another devices that are logged with that
        //token can still remain logged.
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.post('/users/me/avatar',auth,upload.single('avatar'),(req,res)=>{
    res.send()
},(error,req,res,next)=>{
    //this is to handle the errors, it can be puton any route
    res.status(400).send({error:error.message})
})

router.post('/users/logoutAll' ,auth, (req,res)=>{
    try{
        req.user.tokens = []
        req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.get('/users/me',auth,async (req,res)=>{
    res.send(req.user) //in the middleware auth we have authenticated and added user property to req;
    //check that.
    // try {
    //     const users = await User.find({})
    //     res.send(users)
    // }catch(e){
    //     res.status(500).send() //500:internal server error; only sending status code
    // }    
})

router.patch("/users/me", auth ,async(req,res)=>{
    const updates = Object.keys(req.body) //array of properties of the object
    const allowedUpdates = ['name','email','password','age']
    const isValidOperation = updates.every(update=>allowedUpdates.includes(update))//shorthand form

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid Update'})
    }

    //returns true if all returns are true)    
    try{

        //const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true}) //updates bypassing mongoose
        //const user = req.user//await User.findById(req.user._id)
        updates.forEach(update=>req.user[update]=req.body[update])

        await req.user.save()
        //{new:true} => returns the new user; runValidators:true => the program checks requirements of the model restrictions
        //instead of the old one.
        res.send(req.user)       

    }catch(e){
        res.status(500).send(e)  //bad id, could not connect to db.
    }
})


router.delete('/users/me',auth,async (req,res)=>{
    try{
        // const user = await User.findByIdAndDelete(req.user._id) //auth middleware attached the id
        // if(!user){
        //     return res.status(404).send()
        // }
        await req.user.remove() //achieves the exact same behaviour of lines of code above;
        //remove is a mongoose method; for this case we have set a pre event => check the user model
        //the pre which event is "remove"
        res.send(req.user)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router