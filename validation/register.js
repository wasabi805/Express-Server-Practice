//Using validator which was npm previously installed : Validates strings
// see 'Validators' from https://github.com/chriso/validator.js/ for methods()

const Validator =require('validator');
const isEmpty = require('./is-empty');

//export these functions so we can access on other files
module.exports= function validateRegisterInput(data) {

    let errors = {};

    if(!Validator.isLength(data.name, {min: 2, max: 30})){

        errors.name = "Name must be between 2 to 30 characters"
    }

    return  {
        errors: errors, // error obj
        isValid: isEmpty(errors) // check to see if errors obj is empty
    }

};

// console.log(module.exports(),'%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')

//NOTE: we use isValid vs isEmpty because isValid validates an obj: isEmpty validates STRINGS
//so ... to evaluate strings inside the obj, I created a custom 'isEmpty' function located inside is-empty.js



//so, in the return for validateRegisterInput(),
//      if there ARE errors, the length for isValid is >0
//      else, errors == NONE, the length for isValid is =0
//      will need to know if isEmpty (imported custom func() )is true or not for validation used in other files: ex.) see
