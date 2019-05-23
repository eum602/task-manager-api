const request=require('supertest')

const app =  require('../src/app')
const User = require('../src/models/user')

const userOne = {
    name: 'Arturo',
    email: 'r2d2@gmail.com',
    password:'123456789'
}

beforeEach(async()=>{
    await User.deleteMany() //emptying database
    await new User(userOne).save() //creating a new user
})

// afterEach(()=>{
//     console.log('afterEach')
// })

test('Should signup a new user',async()=>{
    await request(app).post('/users').send({
        name:'Erick',
        email: 'erick.pacheco.p@uni.pe',
        password:'123456789'
    }).expect(201) //res status code expected
})

test('Should login existing user',async()=>{
    await request(app).post('/users/login').send({
        email:userOne.email,
        password:'123456789'
    }).expect(200)
})

test('Should not login nonexistent user',async()=>{
    await request(app).post('/users/login').send({
        email:userOne.email,
        password:'fakepassword'
    }).expect(400)
})