//Using validator which was npm previously installed : Validates strings
// see 'Validators' from https://github.com/chriso/validator.js/ for methods()

const Validator =require('validator');
const isEmpty = require('./is-empty');


module.exports= function validateLoginInput(data) {

    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    //NOTE: The order matters for email so it can catch the error

    if(!Validator.isEmail(data.email)){
        console.log(data);
        errors.email = 'Invalid email address.';
    }

    if(Validator.isEmpty(data.email)){
        errors.email = 'Email address is required.';
    }

    if(Validator.isEmpty(data.password)){
        errors.password= 'Password field can not be blank.';
    }

    console.log(data.email, 'from login.js');
    return  {
        errors: errors, // error obj
        isValid: isEmpty(errors) // check to see if errors obj is empty
    }

};