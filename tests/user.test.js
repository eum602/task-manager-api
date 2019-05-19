const request=require('supertest')

const app =  require('../src/app')

test('Should signup a new user',async()=>{
    await request(app).post('/users').send({
        name:'Erick',
        email: 'erick.pacheco.p@uni.pe',
        password:'123456789'
    }).expect(201) //res status code expected
})

