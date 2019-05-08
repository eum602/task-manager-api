//CRUD (create-read-update-delete)
const {MongoClient, ObjectID } = require('mongodb')

const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = 'task-manager'

MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{//this last is a callback when a connection starts running
    if(error){
        return console.log('Unable to connect to database')
    }
    //deleteMany
    const db =  client.db(databaseName)
    // db.collection('users').deleteMany({age:27})
    // .then(result=>{console.log(result)})
    // .catch(e=>{console.log(e)})

    //deleteOne
    db.collection('tasks').deleteOne({description:'Meeting with Jerson and Yoel'})
    .then(result=>{console.log(result)})
    .catch(e=>{console.log(e)})
})