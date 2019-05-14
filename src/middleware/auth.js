const jwt = require('jsonwebtoken')
const User = require('../models/user')
const auth = async (req,res,next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ','') //replace('Bearer ','') replaces the string 'Bearer '
        //with nothing
        //if header is undefined then replace will throw an error so catch will attend this.
        const decoded = jwt.verify(token,'thisismynewcourse') //validating the token with the signature 'thisismynewcourse
        const user = await User.findOne({_id:decoded._id,'tokens.token':token}) //decoded._id is the id returned by verify, that id corresponds
        //to a specific user id, see user model in generateAuthToken method.
        //'tokens.token':token => represent like a loop to findout some match in the tokens array with the specified 
        //token.
        if(!user){
            throw new Error() //throwing an error without a message.
        }

        req.user = user
        next() //if the user correctly is authenticated tben the request can continue
    }catch(e){
        res.status(401).send({error:'please authenticate'})
    }
    
}
module.exports = auth