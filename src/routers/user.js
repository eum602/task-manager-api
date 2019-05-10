const express = require('express')
const User = require('../models/user')
const router = new express.Router()

// router.get('/test', (req,res)=>{
//     res.send("from a new file")
// })

router.post('/users',async(req,res)=>{
    const user = new User(req.body);
    try {
        await user.save()
        res.status(201).send()
    }catch(e){
        res.status(404).send()
    }    
})

router.get('/users',async (req,res)=>{
    try {
        const users = await User.find({})
        res.send(users)
    }catch(e){
        res.status(500).send() //500:internal server error; only sending status code
    }    
})

router.get('/users/:id',async(req,res)=>{ //:id: placeholder; dynamic route handler
    //req.params gives all the params that comes into the query
    //console.log(req.params) //{ id: 'bkdsbfaksdbfkjasd' }
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if(!user){//means mongo does not find the user with that id
            res.status(404).send()
        }else{
            res.send(user)
        }
    }catch(e){
        res.status(500).send()
    }
})



router.patch("/users/:id", async(req,res)=>{
    const updates = Object.keys(req.body) //array of properties of the object
    const allowedUpdates = ['name','email','password','age']
    const isValidOperation = updates.every(update=>allowedUpdates.includes(update))//shorthand form

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid Update'})
    }

    //returns true if all returns are true)    
    try{

        const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true}) 
        //{new:true} => returns the new user; runValidators:true => the program checks requirements of the model restrictions
        //instead of the old one.
        if(!user){
            res.status(404).send()
        }else{
            res.send(user)
        }

    }catch(e){
        res.status(500).send(e)  //bad id, could not connect to db.
    }
})


router.delete('/users/:id',async (req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send()
        }

        res.send(user)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router