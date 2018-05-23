//NOTE: using axios (vs. fetch) automatically sets the auth header upon success login vs. doing this manually every time
//if we used fetch instead

import axios from "axios";

const setAuthToken = token =>{
  //check for token, if it's there apply to every req if we're successfully logged in
    if(token){
        axios.defaults.headers.common['Authorization'] = token //remember in Postman, we had to include Authorization field.
    }
    else{
        //if no token, DELETE THE AUTH HEADER
        delete axios.defaults.headers.common['Authorization']
    }
};

export default setAuthToken;