const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')
const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id : userOneId,
    name: 'Arturo',
    email: 'r2d2@gmail.com',
    password:'123456789',
    tokens: [{
        token:jwt.sign({_id: userOneId},process.env.JWT_SECRET)
    }]
}
const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id : userTwoId,
    name: 'Erick',
    email: 'eum602@gmail.com',
    password:'123456789!',
    tokens: [{
        token:jwt.sign({_id: userTwoId},process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: "First task",
    completed: false,
    owner: userOneId //userOneId is identical the same than userOne._id
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: "Second task",
    completed: true,
    owner: userOneId //userOneId is identical the same than userOne._id
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: "Third task",
    completed: false,
    owner: userTwo._id //userOneId is identical the same than userOne._id
}
const setupDatabase = async () => {
    await User.deleteMany() //emptying database
    await Task.deleteMany()
    await new User(userOne).save() //creating a new user
    await new User(userTwo).save() //creating a new user
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    userOneId,userOne,userTwo,taskOne,setupDatabase
}