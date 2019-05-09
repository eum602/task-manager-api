const mongoose = require('mongoose')
const validator = require('validator')
//Defining my MODEL:
const User = mongoose.model('User',{//when used first time it created a collection eith lowercase and
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

module.exports = User