const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

app.use(express.json()) //parsing automatic incoming json to an object, so we can easily process objects in the

app.use(userRouter)
app.use(taskRouter)

module.exports = app