const validator = require('validator');

const registrationValidate = user => {

    //if we found error then it's store in error store
    const error = {};

    //name validator
    if(!user.name){
        error.name = 'Please provide your name';
    }

    //email validator
    if(!user.email){
        error.email = 'Please provide your Email';
    }else if(!validator.isEmail(user.email)){
        error.email = 'Your email is not valid';
    }

    //passowrd validator
    if(!user.password){
        error.password = 'Please provide your password';
    }else if(user.password.length < 6){
        error.password = 'Password must be greter or equal 6 charcter';
    }

    //confirm passowrd
    if(!user.confirmPassword){
        error.confirmPassword = 'Please provide your confirmation password';
    }else if(user.password !== user.confirmPassword){
        error.confirmPassword = 'Password Does not match';
    }

    return {
        error,
        isValid: Object.keys(error) == 0
    }
}

module.exports = registrationValidate;
