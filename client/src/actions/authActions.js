import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode';

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

//Login User - GET USER TOKEN

export const loginUser = (userData) => dispatch =>{
    axios.post('/api/users/login', userData)
        .then(res=>{
            //Save to local storage
            const  { token } = res.data;
            //set token to local storage
            localStorage.setItem('jwtToken', token); //Note: setItem() only handles strings
            //set token to authHeader
            setAuthToken(token);
            //DECODE the token to extract user data
            const decoded = jwt_decode(token); //decode now contains the user data + time params for when token issued and expires
            //set the current user
            dispatch(setCurrentUser(decoded));
            console.log(token)

        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
        );
};

//Set logged in Current User
export const setCurrentUser = (decoded)=>{
    return{
        type: SET_CURRENT_USER,
        payload: decoded, //remember decoded contains all the user data
    }
};