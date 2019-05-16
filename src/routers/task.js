const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks',auth,async(req,res)=>{//adding auth
    //const task = new Task(req.body)
    const task = new Task({
        ...req.body, //ES6 notation for copying req.body into the task object
        owner:req.user._id //adding the objectId
    })
    try {
        await task.save()
        res.status(201).send(task)//201 stands for created
    }catch(e){
        res.status(400).send()
    }
})

//GET /tasks?completed=true or completed=false
router.get('/tasks',auth,async (req,res)=>{

    const match = {}
    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }

    try {
        //const tasks = await Task.find({owner:req.user._id}) //one option to request
        //await req.user.populate('tasks').execPopulate()//virtual is called tasks=> check user in model
        await req.user.populate({
            path:'tasks',
            match,
            options: {//these are options for pagination
                limit: parseInt(req.query.limit),//2 //how much tasks are sent at once
                skip: parseInt(req.query.skip) //skip indicates from what number of task it will start
                //sending information; lets say we have 10 task, then if we set skip to 3 then it will
                //send from the task number four.
            }
        }).execPopulate() //tasks is the name of the virtual document
        //in User model
        //const tasks = await Task.find({})
        res.send(req.user.tasks)
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/tasks/:id',auth,async(req,res)=>{//adding auth
    const _id = req.params.id//task id
    try {
        const task = await Task.findOne({_id, owner:req.user._id}) //searching by two criteria
        if(!task){
            res.status(404).send()
        }else{
            res.send(task)
        }        
    }catch(e){
        res.status(500).send()
    }
})

router.patch("/tasks/:id", auth, async(req,res)=>{
    const updates = Object.keys(req.body) //array of properties of the object
    const allowedUpdates = ['description','completed']
    const isValidOperation = updates.every(update=>allowedUpdates.includes(update))//shorthand form

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid Update'})
    }

    //returns true if all returns are true)    
    try{
        //const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        const task = await Task.findOne({_id:req.params.id, owner:req.user._id})//await Task.findById(req.params.id)
        
        if(!task){
            return res.status(404).send()
        }        

        updates.forEach(update => task[update] = req.body[update])
        await task.save()

        res.send(task)

    }catch(e){
        res.status(500).send(e)  //bad id, could not connect to db.
    }
})

router.delete('/tasks/:id', auth , async (req,res)=>{
    try{
        const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})//await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).send()
        }

        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router