const mongoose = require('mongoose')
//const dbName = `task-manager-api`
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useCreateIndex: true, //when mongoose works with mongodb our index is created allowing us to 
    //quickly access the data we need to access.
    useFindAndModify:false //to handle DeprecationWarning: collection.findAndModify is deprecated (see lecture 93)
})
