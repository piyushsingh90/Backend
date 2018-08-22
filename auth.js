var bcrypt = require('bcrypt-nodejs')
var User = require('./models/User.js')
var jwt = require('jwt-simple')

module.exports = {
    register: (req, res) => {
        var userData = req.body;
        
        var user = new User(userData)
        user.save((err, result) => {
            if (err)
            console.log('Error while saving user')
    
            
            res.sendStatus(200)
        })
    
    },

    login: async (req, res) => {
        var loginData = req.body;
        
        var user = await User.findOne({email: loginData.email})
    
        if(!user) {
            return res.status(401).send({message: 'Email or password is invalid'});
        }
    
        bcrypt.compare(loginData.pwd, user.pwd, (err, isMatch) => {
            if(!isMatch){
                return res.status(401).send({message: 'Email or password is invalid'});
            }
    
            var payload = {}
    
            var token = jwt.encode(payload, '123')
            
            res.status(200).send({token})
        })
    }


}