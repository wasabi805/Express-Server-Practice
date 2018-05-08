const Validator =require('validator');
const isEmpty = require('./is-empty');


module.exports= function validatePostInput(data) {

    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : '';

    if(!Validator.isLength(data.text, {min: 10, max: 300})){
        errors.text = 'Post must be between 10 and 300 characters.'
    }


    if(Validator.isEmpty(data.text)){
        errors.text = 'Text field is required.';
    }

    console.log(data, '<=======================');

    return  {
        errors: errors, // error obj
        isValid: isEmpty(errors) // check to see if errors obj is empty
    }

};