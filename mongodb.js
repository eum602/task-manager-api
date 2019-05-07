//CRUD (create-read-update-delete)
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient //to connect to db

const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = 'task-manager'

MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{//this last is a callback when a connection starts running
    if(error){
        return console.log('Unable to connect to database')
    }

    //console.log('Connected correctly')
    const db = client.db(databaseName) //connecting to database we want to manipulate
    db.collection('users').insertOne({//inserting one data on user collection
        name:'Erick',
        age:27
    },(error,result)=>{
        if(error){
            return console.log('Unable to insert user')
        }
        
        console.log(result.ops)
    })
})