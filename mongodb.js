//CRUD (create-read-update-delete)
//const mongodb = require('mongodb')
//const MongoClient = mongodb.MongoClient //to connect to db
//const ObjectID = mongodb.ObjectID //each document we enter to mongo gets assigned an automatic objectID
const {MongoClient, ObjectID } = require('mongodb')

const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = 'task-manager'

const id = new ObjectID()
//console.log(id.getTimestamp())
//console.log(id.id) //<Buffer 5c d1 ae 97 1b 03 33 1f 1d d9 1f f9>
//console.log(id.id.length) //12;
//console.log(id.toHexString()) //5cd1af2935cad221ef5ecf8f
//console.log(id.toHexString().length) //24


MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{//this last is a callback when a connection starts running
    if(error){
        return console.log('Unable to connect to database')
    }

    //console.log('Connected correctly')
    // const db = client.db(databaseName) //connecting to database we want to manipulate
    // db.collection('users').insertOne({//inserting one data on user collection
    //     _id: id,
    //     name:'Erick',
    //     age:27
    // },(error,result)=>{
    //     if(error){
    //         return console.log('Unable to insert user')
    //     }

    //     console.log(result.ops)
    // })
//INSERT MANY
    // db.collection('users').insertMany([
    //     {name:'Arturo',age:24},
    //     {name:"Yessica",age:28}],(error,result)=>{
    //     if(error){
    //         return console.log('Unable to insert documents')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {description:"meeting with Juan",completed:true},
    //     {description:"Meeting with Jerson and Yoel",completed:true},
    //     {description:"Finish Nodejs App", completed: false}],
    //     (error,result)=>{
    //         if(error){
    //             return console.log('Unable to insert documents')
    //         }
    //         console.log(result.ops)
    //     }
    // )
})