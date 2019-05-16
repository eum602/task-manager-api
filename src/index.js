const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) //parsing automatic incoming json to an object, so we can easily process objects in the

app.use(userRouter)
app.use(taskRouter)

const multer = require('multer')
const upload = multer({
    dest:'images', //where to store
    limits: {
        fileSize: 1000000 //(1MB) => limiting the filesize to 1MB
    },
    fileFilter(req,file,cb){
        //file is not a PDF
        if(!file.originalname.endsWith('.pdf')){
            return(cb(new Error('please upload a PDF')))
        }

        cb(undefined,true)

        // cb(new Error('File must be a PDF'))

        // cb(undefined,true) //undefined to indicate that nothing went wrong
        // //we provide the value of true if the upload should be expected

        // cb(undefined,false) //undefined: => no error ; false => reject the upload
    }
})

app.post('/upload',upload.single('upload'),(req,res)=>{ //using the middleware upload.single
    //here we are telling multer to look for a file called upload wnen the request comes in.
    //so that is why we muust specify that key in the reuest client side.
    //a folder images is automatically created and inside will be stored all files because of the 
    //"upload.single()" method.
    res.send()
})

app.listen(port , ()=>{console.log(`Server is up on port ${port}`)})