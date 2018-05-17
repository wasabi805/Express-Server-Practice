const Validator =require('validator');
const isEmpty = require('./is-empty');


module.exports= function validateProfileInput(data) {

    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';

    //NOTE: The order matters for email so it can catch the error


    if(!Validator.isLength(data.handle,{min: 2, max: 40})) {

        errors.handle = 'Handle needs to be between 2 and 4 characters.';
    }

    if(Validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is required.';
    }

    if(Validator.isEmpty(data.status)) {
        errors.status = 'Status field is required.';
    }

    if(Validator.isEmpty(data.skills)) {
        errors.skills = 'Skills field is required.';
    }

    //Check to see if its not empty
    //this can be empty since it's optional BUT, if there is a site, it should be in URL format.

    if(!isEmpty(data.website)){
        if(!Validator.isURL(data.website)){
            errors.website= "Not a valid URL"
        }
    }

    if(!isEmpty(data.youtube)){
        if(!Validator.isURL(data.youtube)){
            errors.youtube= "Not a valid URL"
        }
    }
    if(!isEmpty(data.twitter)){
        if(!Validator.isURL(data.twitter)){
            errors.twitter= "Not a valid URL"

        }
    }
    if(!isEmpty(data.facebook)){
        if(!Validator.isURL(data.facebook)){
            errors.facebook= "Not a valid URL"

        }
    }
    if(!isEmpty(data.linkedin)){
        if(!Validator.isURL(data.linkedin)){
            errors.linkedin= "Not a valid URL"

        }
    }
    if(!isEmpty(data.instagram)){
        if(!Validator.isURL(data.instagram)){
            errors.instagram= "Not a valid URL"

        }
    }

    return  {
        errors: errors, // error obj
        isValid: isEmpty(errors) // check to see if errors obj is empty
    }

};