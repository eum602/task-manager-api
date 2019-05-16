const mongoose = require('mongoose')
//Creating the model for Task
const taskSchema = new mongoose.Schema({//when used first time it created a collection eith lowercase and
    //in plural => "tasks
    description:{
        type: String,
        required:true,
    },
    completed:{
        type: Boolean,
        default:false,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId, //object is an object id
        required: true,
        ref: 'User' //making a reference to relate the collection Task with the User collection.
    }
},{timestamps:true})
//Not using a middleware in this case:
// taskSchema.pre('save',function(next){

//     next()
// })
const Task = mongoose.model('Task',taskSchema)

module.exports = Task