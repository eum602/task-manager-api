const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// app.use((req,res,next)=>{
//     if(req.method==='GET'){
//         res.send("'GET' requests are disabled")
//     }else{
//         next()
//     }
// })

// app.use((req,res,next)=>{
//     res.status(503).send('Service is temporarily unavailable')
// })

app.use(express.json()) //parsing automatic incoming json to an object, so we can easily process objects in the
//requests handlers

app.use(userRouter)
app.use(taskRouter)

//Without middleware: new request -> run route handler
//With middleware: new request -> do something -> run route handler

app.listen(port , ()=>{console.log(`Server is up on port ${port}`)})

const jwt = require('jsonwebtoken')
const myfunction = async () => {
    const token = jwt.sign({_id:"something"},'somerandomseriescharacters',{expiresIn:'7 days'}) //0 seconds
    //{_id:"something"}=>is a unique identifier for the user who's been authenticated
    //The second argument ("somerandomseriescharacters") is the signature to verify the first argument(which
    //is not necessarily private, instead public)
    console.log(token)
    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJzb21ldGhpbmciLCJpYXQiOjE1NTc3NzY2MzV9.uX7GacCMTXL2MItmh5ICuWjM3n_vXMwI-5uCChRkXBo
    //1.  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 ==> This is known as the header, contains metainformation about
                    //what type of inforrmation it is 
    //2.  eyJfaWQiOiJzb21ldGhpbmciLCJpYXQiOjE1NTc3NzY2MzV9 ==> This is the payload or body, it is a 64 encoded
                    //json String and this contains the data that we provided, which in our case
                    //will be our _id
    //3.  uX7GacCMTXL2MItmh5ICuWjM3n_vXMwI-5uCChRkXBo => this is the signature, this is used to verify the token

    //Verifying
    const data = jwt.verify(token,"somerandomseriescharacters") //simulationg the fact that if a token is generated
    //then it can be verified by using the signature ("somerandomseriescharacters")

    console.log(data)
}

const Task = require('./models/task')
const User = require('./models/user')

const myfcn = async () => {
    /*const task = await Task.findById('5cdc589167896d20130e4464')
    //console.log(task.owner)
    await task.populate('owner').execPopulate() //tries to find the "user" who is associated with 
    //this task; this is possible thanks to ref property on owner property on Task model.
    console.log(task.owner)//now it returns the complete user who owns this task.*/

    const user = await User.findById('5cdc56366ea971135aeb3a3e')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks) //this tasks are stored not on the users collection but on the tasks collection
}

myfcn()