const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
//Defining my MODEL:
const userSchema = new mongoose.Schema({//when used first time it created a collection eith lowercase and
    //in plural => "tasks"
    //setting up all those fields as properties of this object
    name:{
        type:String,
        required:true, //customizing the user
        trim:true //removing leading and trailing spaces; see docs l-85
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate (value) {
            if(!validator.isEmail(value)){
                throw Error('Email is invalid')
            }
        }
    },
    age:{
        type: Number,
        default:0,
        validate(value) {
            if(value<0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain password')
            }
        }
    }
})
//Now using a middleware before saving
userSchema.pre('save', async function(next){//save: the name of the event 
    const user = this //this makes reference to the document that is being saved=> rhe user we want to save
    console.log('just before saving')

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8) //using eigth rounds of hashing
    }

    next() //next is super important to be called in order to exit this function and continue working

})
const User = mongoose.model('User',userSchema) //userSchema: The mongoose objectect that represents the schema

module.exports = User