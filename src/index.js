const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) //parsing automatic incoming json to an object, so we can easily process objects in the
//requests handlers

app.post('/users',async(req,res)=>{
    const user = new User(req.body);
    try {
        await user.save()
        res.status(201).send()
    }catch(e){
        res.status(404).send()
    }
    
    // .then(()=>{res.status(201).send(user)})
    // .catch(e=>{
    //     //res.status(400) //setting the status code to 400 bad request from the cient
    //     //res.send(e)})
    //     res.status(400).send(e) //chaining
    // })
})

app.get('/users',async (req,res)=>{
    try {
        const users = await User.find({})
        res.send(users)
    }catch(e){
        res.status(500).send() //500:internal server error; only sending status code
    }    
})

app.get('/users/:id',async(req,res)=>{ //:id: placeholder; dynamic route handler
    //req.params gives all the params that comes into the query
    //console.log(req.params) //{ id: 'bkdsbfaksdbfkjasd' }
    const _id = req.params.id
    try {
        const user = User.findById(_id)
        if(!user){//means mongo does not find the user with that id
            res.status(404).send()
        }else{
            res.send(user)
        }
    }catch(e){
        res.status(500).send()
    }
})



app.patch("/users/:id", async(req,res)=>{
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


app.delete('/users/:id',async (req,res)=>{
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

app.post('/tasks',async(req,res)=>{
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send()//201 stands for created
    }catch(e){
        res.status(400).send()
    }
})

app.get('/tasks',async (req,res)=>{
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    }catch(e){
        res.status(500).send(e)
    }
})

app.get('/tasks/:id',async(req,res)=>{
    const _id = req.params.id
    try {
        const task = Task.findById(_id)
        if(!task){
            res.status(404).send()
        }else{
            res.send(task)
        }        
    }catch(e){
        res.status(500).send()
    }
})

app.patch("/tasks/:id", async(req,res)=>{
    const updates = Object.keys(req.body) //array of properties of the object
    const allowedUpdates = ['description','completed']
    const isValidOperation = updates.every(update=>allowedUpdates.includes(update))//shorthand form

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid Update'})
    }

    //returns true if all returns are true)    
    try{

        const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})         
        if(!task){
            res.status(404).send()
        }else{
            res.send(task)
        }

    }catch(e){
        res.status(500).send(e)  //bad id, could not connect to db.
    }
})

app.delete('/tasks/:id',async (req,res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).send()
        }

        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})

app.listen(port , ()=>{console.log(`Server is up on port ${port}`)})