const mongoose = require('mongoose')
const validator = require('validator')
const dbName = `task-manager-api`
mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`,{
    useNewUrlParser:true,
    useCreateIndex: true //when mongoose works with mongodb our index is created allowing us to 
    //quickly access the data we need to access.
})

//Defining my MODEL:
const User = mongoose.model('User',{
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
//Creating a new instance of the MODEL "User"
// const me = new User({
//     name: "Jonatan      ",
//     email:'    abc@u.pe         ',
//     age: 36,
//     password: "abcdefhf  123"
// })

// me.save()
// .then(()=>{console.log(me)})
// .catch(e=>{console.log(e)})

//Creating the model for Task
const Task = mongoose.model('Task',{
    description:{
        type: String,
        required:true,
    },
    completed:{
        type: Boolean,
        default:false,
    }
})
//creating a new instance
const task1 = new Task({
    description:"Meeting on Tuesday",
    //completed:false
})

task1.save()
.then(()=>{
    console.log(task1)
})
.catch(e=>{console.log(e)})