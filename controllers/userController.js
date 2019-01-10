const bcrypt = require('bcrypt')
const User =require('../models/User');
const registrationValidate = require('../validators/registrationValidator')

module.exports = {
    register(req, res){
        const {name, email, password, confirmPassword} = req.body;

        const result = registrationValidate({name, email, password, confirmPassword})

        if(!result.isValid){
            res.status(400).json(result.error)
        }else{
            res.status(200).json({
                message: 'Everything is ok'
            })
        }
    }
}
