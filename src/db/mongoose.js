const mongoose = require('mongoose')
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
        type:String
    },
    age:{
        type: Number        
    }
})
//Creating a new instance of the MODEL "User"
// const me = new User({
//     name: "Erick",
//     age: '31'
// })

// me.save()
// .then(()=>{console.log(me)})
// .catch(e=>{console.log(e)})

//Creting the model for Task
const Task = mongoose.model('Task',{
    description:{
        type: String
    },
    completed:{
        type: Boolean
    }
})
//creating a new instance
const task1 = new Task({
    description:"Meeting on Monday",
    completed:false
})

task1.save()
.then(()=>{
    console.log(task1)
})
.catch(e=>{console.log(e)})