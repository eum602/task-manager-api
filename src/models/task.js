const mongoose = require('mongoose')
//Creating the model for Task
const Task = mongoose.model('Task',{//when used first time it created a collection eith lowercase and
    //in plural => "tasks
    description:{
        type: String,
        required:true,
    },
    completed:{
        type: Boolean,
        default:false,
    }
})

module.exports = Task