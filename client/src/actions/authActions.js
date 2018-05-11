import axios from 'axios';
import { GET_ERRORS } from './types'



//Register User
                            //added history param
export const registerUser = (userData, history)=>(dispatch)=>{ //<=== added dispatch

    axios.post('/api/users/register',userData) //<=== pass in userData from ln above
        .then(res=> history.push('/login')) //redirect if registration success
        .catch(err=>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );

};