const request=require('supertest')
const jwt =  require('jsonwebtoken')
const mongoose = require('mongoose')
const app =  require('../src/app')
const User = require('../src/models/user')
const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id : userOneId,
    name: 'Arturo',
    email: 'r2d2@gmail.com',
    password:'123456789',
    tokens: [{
        token:jwt.sign({_id: userOneId},process.env.JWT_SECRET)
    }]
}

beforeEach(async()=>{
    await User.deleteMany() //emptying database
    await new User(userOne).save() //creating a new user
})

// afterEach(()=>{
//     console.log('afterEach')
// })

test('Should signup a new user',async()=>{
    const response = await request(app).post('/users').send({
        name:'Erick',
        email: 'erick.pacheco.p@uni.pe',
        password:'123456789'
    }).expect(201) //res status code expected

    //assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull();

    //assertions about the response
    expect(response.body).toMatchObject({ //obliges that object must AT LEAST have the indicated
        //parameters but not necessarily the same
        user:{
            name: "Erick",
            email: "erick.pacheco.p@uni.pe"
        },
        token:user.tokens[0].token
    })

    expect(user.password).not.toBe('123456789')
})

test('Should login existing user',async()=>{
    const response = await request(app).post('/users/login').send({
        email:userOne.email,
        password:'123456789'
    }).expect(200)

    const user = await User.findById(userOne)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login nonexistent user',async()=>{
    await request(app).post('/users/login').send({
        email:userOne.email,
        password:'fakepassword'
    }).expect(400)
})

test('Should get profile for user', async()=>{
    await request(app)
    .get('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`) //setting auth header;...using the token defined above
    .send()
    .expect(200)
})

test('Should not get profile for unauthenticated user', async () =>{
    await request(app)
    .get('/users/me')
    .send()
    .expect(401)//comes fro auth middleware
})

test('Should delete account for user', async()=>{
    const response = await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

    //verifying the database has deleted the user
    const user = await User.findById(userOne)
    expect(user).toBeNull()
})

test('Should not delete account for user', async()=>{
    await request(app)
    .delete('/users/me')    
    .send()
    .expect(401)
})