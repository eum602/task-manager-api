const request=require('supertest')
const app =  require('../src/app')
const User = require('../src/models/user')

const {userOneId,userOne,setupDatabase} = require('./features/db')

beforeEach(setupDatabase)
    //async()=>{
    //await setupDatabase()    
//})

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

test('Should upload avatar image',async()=>{
    await request(app)
    .post('/users/me/avatar')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .attach('avatar','tests/features/profile-pic.jpg')//we send the key value {avatar:image_to_send}
    .expect(200)

    const user =  await User.findById(userOneId)
    //expect({}).toBe({})//because jest uses triple equality. And in objects one object is 
    //not equal to another even if the have the same properties; so instead use toBeEqual
    //expect({}).toEqual({}) //it has algorithms that checks not whole objects but only the properties
    expect(user.avatar).toEqual(expect.any(Buffer)) //expects the avatar to be a buffer
})

test('Should update valid user fields', async()=>{
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        name: "Erick Pachecos"
    })
    .expect(200)
    //checking the data has been changed on the database
    const user = await User.findById(userOneId)
    // expect(user).toMatchObject({ //IT ALSO WORKS
    //     name:"Erick Pachecos"
    // })

    expect(user.name).toEqual('Erick Pachecos')
})

test('Should not update invalid user fields', async()=>{
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        location: "fake" //non existing field
    }).expect(400)
})

