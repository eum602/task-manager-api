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
        // if(!file.originalname.endsWith('.pdf')){
        //     return(cb(new Error('please upload a PDF')))
        // }

        if(!file.originalname.match(/\.(doc|docx)$/)){ //matching file extension finished with
            //doc or docx => l124
            return(cb(new Error('please upload a word document')))
        }
        cb(undefined,true)

        // cb(new Error('File must be a PDF'))

        // cb(undefined,true) //undefined to indicate that nothing went wrong
        // //we provide the value of true if the upload should be expected

        // cb(undefined,false) //undefined: => no error ; false => reject the upload
    }
})

const errorMiddleware = (req, res, next) => {
    throw Error('from my middleware')
}
app.post('/upload',upload.single('upload'),(req,res)=>{ //using the middleware upload.single
    //here we are telling multer to look for a file called upload wnen the request comes in.
    //so that is why we muust specify that key in the reuest client side.
    //a folder images is automatically created and inside will be stored all files because of the 
    //"upload.single()" method.
    res.send()
},(error,req,res,next)=>{
    //this is to handle the error
    res.status(400).send({error:error.message})
})

app.listen(port , ()=>{console.log(`Server is up on port ${port}`)})