
//used to validate strings
//NOTE: Can use this later on client side validation later
const isEmpty = (value)=> {

    return(
        value === undefined ||
        value ===null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0 )
    );
};

//if it is in string format but it's blank/empty string
//if you get back an obj and it's empty

//export so we can use in other files (see ln 5 inside validation/register.js)

console.log(isEmpty(''));
module.exports= isEmpty;

