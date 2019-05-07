//CRUD (create-read-update-delete)
const {MongoClient, ObjectID } = require('mongodb')

const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = 'task-manager'

MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{//this last is a callback when a connection starts running
    if(error){
        return console.log('Unable to connect to database')
    }

    const db =  client.db(databaseName)
    //db.collection('users').findOne({name:"Erick",age:25},(error,user)=>{
    //searching only one document
        db.collection('users').findOne({_id:new ObjectID('5cd1ad44d9865c18bf5a72a3')},(error,user)=>{
            //we specify new ObjectID("...") because what is stored as an id is not the string but an object.
        if(error){
            return console.log("Unable to fetch")
        }
        console.log(user)
    })

    db.collection('tasks').findOne({_id:new ObjectID('5cd1a3b71cdf9c6dd1ed3d5c')},(error,task)=>{
            //we specify new ObjectID("...") because what is stored as an id is not the string but an object.
        if(error){
            return console.log("Unable to fetch")
        }
        console.log(task)
    })

    //seacrching multiple documents
    db.collection('users').find({age:27}).toArray((error,users)=>{
        if(error){
            return console.log('Error')
        }
        console.log(users)
    })//instead a callback it is returned a cursor which
    //is a pointer to the data in the database; 
    //by using toArray we pull all the elementes that matches the search criteria
    //we must be sure we have enough ram.

    db.collection('users').find({age:27}).count((error,count)=>{
        console.log(count)
    })//instead of pull all only for counting operation we let mongo do the search
    //so we do not put pressure on our ram memory.

    db.collection('tasks').find({completed:false}).toArray((error,tasks)=>{
        if(error){
            return console.log('Error')
        }
        console.log(tasks)
    })    
})