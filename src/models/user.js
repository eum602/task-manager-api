const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
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
        unique:true, //it is gonna create a unique index to make sure emails do not repeat
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
    },
    tokens:[//will be an array
        {//where each element 
            token:{//has these characteristics:
                type:String,
                required:true
            }            
    }] 
})

//methods are accessible on the INSTANCES, so these are called instance methods.
userSchema.methods.generateAuthToken= async function(){
    //we use function notation because we want to access to "this"
    
    const user = this
    const token = jwt.sign({_id:user._id.toString()},'thisismynewcourse') //toString() is to convert from   
    //objectId  to a standard string.
    user.tokens = user.tokens.concat({token}) //abbreviation of ...concat({token:token})    
    await user.save()
    return token    
}

userSchema.statics.findByCredentials = async (email,password) =>{//static methods are accesible on the model,
    //sometimes called model methods
    const user = await User.findOne({email})

    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.hash(password,user.password)

    if(!isMatch){
        throw new Error('Unable to login')//providing same message on order to hide as much 
        //information as is possible for attackers
    }
    return user
}

//Now using a middleware to hash the plain text password before saving
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