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

app.post('/tasks',async(req,res)=>{
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send()//201 stands for created
    }catch(e){
        res.status(400).send()
    }
})

app.get('/tasks',(req,res)=>{
    try {
        const tasks = Task.find({})
        res.send(tasks)
    }catch(e){
        res.status(500).send()
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

app.listen(port , ()=>{console.log(`Server is up on port ${port}`)})