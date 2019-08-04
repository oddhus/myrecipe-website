const jwt = require('jsonwebtoken')
const User = require('../models/user')

const checkUser = async (req, res, next) => {
    try {
            if (req.cookies.access_token || req.header('Authorization')){
                const token = req.cookies.access_token || req.header('Authorization').replace('Bearer ', '')
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
                if (user) {
                    req.isLoggedIn = true
                } else {
                    req.isLoggedIn = false
                }
            }

           
            next()
        
    } catch (error) {
        res.status(401).send()
    }
    
}

module.exports = checkUser