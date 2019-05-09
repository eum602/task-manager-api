const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) //parsing automatic incoming json to an object, so we can easily process objects in the
//requests handlers

app.post('/users',(req,res)=>{    
    const user = new User(req.body);
    user.save()
    .then(()=>{res.status(201).send(user)})
    .catch(e=>{
        //res.status(400) //setting the status code to 400 bad request from the cient
        //res.send(e)})
        res.status(400).send(e) //chaining
    })
})

app.get('/users',(req,res)=>{
    User.find({}) //{} means it will fetch all from the User
    .then(users =>{
        res.send(users)
    })
    .catch(e=>{res.status(500).send()})//500:internal server error; only sending status code
})

app.get('/users/:id',(req,res)=>{ //:id: placeholder; dynamic route handler
    //req.params gives all the params that comes into the query
    //console.log(req.params) //{ id: 'bkdsbfaksdbfkjasd' }
    const _id = req.params.id
    User.findById(_id)
    .then(user=>{
        if(!user){//means mongo does not find the user with that id
            return res.status(404).send()
        }
        res.send(user)
    })
    .catch(e=>{
        console.log(e)
        res.status(500).send()
    })
})

app.post('/tasks',(req,res)=>{
    const task = new Task(req.body)
    task.save()
    .then(()=>{res.status(201).send(task)}) //201 stands for created
    .catch((e)=>{res.status(400).send(e)})
})

app.get('/tasks',(req,res)=>{
    Task.find({})
    .then(tasks =>{
        res.send(tasks)
    })
    .catch(e=>{res.status(500).send()})//500:internal server error; only sending status code
})

app.get('/tasks/:id',(req,res)=>{
    const _id = req.params.id
    Task.findById(_id)
    .then(task=>{
        if(!task){//means mongo does not find the user with that id
            return res.status(404).send()
        }
        res.send(task)
    })
    .catch(e=>{
        console.log(e)
        res.status(500).send()
    })
})

app.listen(port , ()=>{console.log(`Server is up on port ${port}`)})