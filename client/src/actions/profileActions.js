import axios from 'axios';


import {GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER} from "./types";

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
        }));
};

//Create User Profile
export const createProfile = (profileData, history)=> dispatch=> {
    axios.post('/api/profile', profileData).then(res=>history.push('/dashboard')).catch(err=>dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));
};

//Add experience

export const addExperience = (expData, history)=> dispatch =>{
    axios
        .post('/api/profile/experience', expData)
        .then(res=>history.push('/dashboard'))
        .catch(err=> dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
};

//Add education

export const addEducation = (eduData, history)=> dispatch =>{
    axios
        .post('/api/profile/education', eduData)
        .then(res=>history.push('/dashboard'))
        .catch(err=> dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
};

//Delete Experience

export const deleteExperience = (id)=> dispatch =>{
    axios
        .delete(`/api/profile/experience/${id}`)
        .then(res=>
            dispatch({
                type: GET_PROFILE,
                payload: res.data //payload is res.data so we can bring back the profile now minus the deleted profile
            })

        )
        .catch(err=> dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
};

//Delete Education

export const deleteEducation = (id)=> dispatch =>{
    axios
        .delete(`/api/profile/education/${id}`)
        .then(res=>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })

        )
        .catch(err=> dispatch({
            type: GET_ERRORS,
            payload: err.response.data
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

//Delete User Account && Profile

export const deleteAccount =()=> dispatch =>{

    if(window.confirm('Are you sure? This cannot be undone.')){
        axios.delete('/api/profile').then(res=>dispatch({

                type: SET_CURRENT_USER,
                payload: {}
            })

        ).catch(err=> dispatch({

                type: GET_ERRORS,
                payload: err.response.data
            })
        )
    }
};
