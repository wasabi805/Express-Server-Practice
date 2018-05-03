//Using validator which was npm previously installed : Validates strings
// see 'Validators' from https://github.com/chriso/validator.js/ for methods()

const Validator =require('validator');
const isEmpty = require('./is-empty');


module.exports= function validateRegisterInput(data) {

    let errors = {};

    //need to define data.name so that logic for ln 18 works
    data.name = !isEmpty(data.name) ? data.name : '';   //<=== data.name is not equal to isEmpty() : remember that this func can return null as well
                                                        // ternary: data.name can only whatever came from the form submit (ie req.body.name)
                                                        // OR ..  data.name is equal to blank/ empty string

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';


    if(!Validator.isLength(data.name, {min: 2, max: 30})){
        errors.name = "Name must be between 2 to 30 characters."
    }

    //if testing for data.name to not be empty,
    // then need to specify that data.name is only allowed to be whatever was entered by user the form submit OR blank/"". (See ln 13 of this file)
    if(Validator.isEmpty(data.name)){
        errors.name= 'Name field can not be blank.'
    }

    if(!Validator.isEmail(data.email)){                             //<=== .isEmail() = email format
        errors.email= 'Email field can not be blank.'
    }

    if(Validator.isEmpty(data.password)){
        errors.password= 'Password field can not be blank.'
    }

    if(!Validator.isLength(data.password, {min: 5, max: 30})){      //<=== if the pw length is not at least  5 or greater than 30
        errors.password= 'Password must be at least 5 characters. .'
    }

    if(Validator.isEmpty(data.password)){
        errors.password2= 'Please confirm the password.'
    }

    if(!Validator.equals(data.password, data.password2)){           //<=== if the passwords don't match
        errors.password2= 'Passwords do not match, please re-enter. .'
    }

    console.log(errors);
    return  {
        errors: errors, // error obj
        isValid: isEmpty(errors) // check to see if errors obj is empty
    }

};




