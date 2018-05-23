import axios from 'axios';
import {ADD_POST, GET_ERRORS, GET_POSTS, POST_LOADING} from "./types";


//ADD A POST

export const addPost =postData=>dispatch=>{

    axios
        .post('/api/posts', postData)
        .then(res=>dispatch({
                type: ADD_POST,
                payload: res.data
        })
        ).catch(err=>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
        })
    )
};

//GET POSTS

export const getPosts =()=> dispatch => {

    dispatch(setPostLoading());

    axios
        .get('/api/posts')
        .then(res => dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        ).catch(err =>
        dispatch({
            type: GET_POSTS,
            payload: null
        })
    )
};

//Set Post Loading STATE


export const setPostLoading =() => {
    return{
        type: POST_LOADING,
    }
};

