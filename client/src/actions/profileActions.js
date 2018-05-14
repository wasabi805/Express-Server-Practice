import axios from 'axios';


import {GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE} from "./types";

//Get current profile

export const getCurrentProfile=()=>dispatch =>{
    dispatch(setProfileLoading());
    axios.get('/api/profile')
        .then(res=>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err=>dispatch({
            type: GET_PROFILE,
            payload: {} //if no profile, return an empty {}so it can fail validation and redirect us to create a new profile
        }))
};

//Profile Loading
export const setProfileLoading = () =>{
  return{
      type: PROFILE_LOADING
  }
};

//Clear the profile {} when user logs out
export const clearCurrentProfile = () =>{
    return{
        type: CLEAR_CURRENT_PROFILE
    }
};
