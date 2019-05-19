const app = require('./app')

const port = process.env.PORT //using env-cmd to set the enviroment variable (see l133) || 3000


app.listen(port , ()=>{console.log(`Server is up on port ${port}`)})