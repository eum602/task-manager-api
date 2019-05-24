const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')
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

const setupDatabase = async () => {
    await User.deleteMany() //emptying database
    await new User(userOne).save() //creating a new user
}

module.exports = {
    userOneId,userOne,setupDatabase
}