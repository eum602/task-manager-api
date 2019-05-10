const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

router.post('/tasks',async(req,res)=>{
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send()//201 stands for created
    }catch(e){
        res.status(400).send()
    }
})

router.get('/tasks',async (req,res)=>{
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/tasks/:id',async(req,res)=>{
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if(!task){
            res.status(404).send()
        }else{
            res.send(task)
        }        
    }catch(e){
        res.status(500).send()
    }
})

router.patch("/tasks/:id", async(req,res)=>{
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

router.delete('/tasks/:id',async (req,res)=>{
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

module.exports = router