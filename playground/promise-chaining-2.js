require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndRemove('5cd39255b3832853b45ac0a4')//{age:1} => the value to update
// .then(res=>{
//     console.log(res)
//     return Task.find({completed:false})
// }).then(tasks=>{
//     console.log(tasks)
//     return Task.countDocuments({completed:false})
// }).then(counter=>{
//     console.log(counter)
// }).catch(e=>{console.log(e)})

//ASYNC-AWAIT APPROACH
const deleteTaskAndCount = async (id,completed) =>{
    await Task.findByIdAndRemove(id)
    const count =Task.countDocuments({completed})
    return count
}

deleteTaskAndCount('5cd39255b3832853b45ac0a4',false).then(count=>{
    console.log('count',count)
}).catch(e=>{
    console.log('e',e)
})