//CRUD (create-read-update-delete)
const {MongoClient, ObjectID } = require('mongodb')

const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = 'task-manager'

MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{//this last is a callback when a connection starts running
    if(error){
        return console.log('Unable to connect to database')
    }

    const db =  client.db(databaseName)
    //updating one element
    // db.collection('users').updateOne(
    //     {_id: new ObjectID('5cd19d0a3a138c52348a026c')},//the id to update
    //     //{$set:{name: 'David'}}//the values to update
    //     {$inc:{age:-1}} //increments a value in a specified amount
    //     //for example here we are decreasing in one.
    // ).then(result=>{
    //     console.log(result)
    // }).catch(e=>{
    //     console.log(e)
    // })

    //update many
    db.collection('tasks').updateMany(
        {completed:false},//search criteria
        {$set:{completed:true}} //what to update
    ).then(result=>{
        console.log(result)
    }).catch(e=>{
        console.log(e)
    })
})