
//NOTE: used for client-side validation

const isEmpty = (value)=> {

    return(
        value === undefined ||
        value ===null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0 )
    );
};

//since we're in React land and not server land, use export default instead of module.exports
export default isEmpty;