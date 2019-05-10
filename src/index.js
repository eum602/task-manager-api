const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) //parsing automatic incoming json to an object, so we can easily process objects in the
//requests handlers

app.use(userRouter)
app.use(taskRouter)

app.listen(port , ()=>{console.log(`Server is up on port ${port}`)})