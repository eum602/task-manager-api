require('../src/db/mongoose')
const User = require('../src/models/user')
//5cd39c249e480178ee0d1534


User.findByIdAndUpdate('5cd39c249e480178ee0d1534',{age: 1})//{age:1} => the value to update
.then(user=>{
    console.log(user)
    return User.countDocuments({age:1})
}).then(user=>{
    console.log(user)
}).catch(e=>{console.log(e)})
