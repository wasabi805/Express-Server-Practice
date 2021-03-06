import axios from 'axios';
import {ADD_POST, GET_POST, DELETE_POST, GET_ERRORS, GET_POSTS, POST_LOADING, CLEAR_ERRORS} from "./types";


//ADD A POST

export const addPost =postData=>dispatch=>{

    //clear out UI comment errors once the user makes the correction:
    dispatch(clearErrors()); //method is below in this file

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

//GET MULTI POSTS

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

//DELETE A POST

export const deletePost = id =>dispatch=>{

    axios
        .delete(`/api/posts/${id}`)
        .then(res=>dispatch({
                type: DELETE_POST,
                payload: id
            })
        ).catch(err=>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    )
};


//ADD LIKE to a Post

export const addLike = id =>dispatch=>{

    axios.post(`/api/posts/like/${id}`)

        .then(res=>dispatch(getPosts()))
        .catch(err=>
            dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    )
};


//REMOVE LIKE to a Post

export const removeLike = id =>dispatch=>{

    axios.post(`/api/posts/unlike/${id}`)

        .then(res=>dispatch(getPosts()))
        .catch(err=>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
};


//GET SINGLE POST

export const getPost =(id)=> dispatch => {

    dispatch(setPostLoading());

    axios
        .get(`/api/posts/${id}`)
        .then(res => dispatch({
                type: GET_POST,
                payload: res.data
            })
        ).catch(err =>
        dispatch({
            type: GET_POST,
            payload: null
        })
    )
};

//ADD A COMMENT

export const addComment =(postId, commentData)=>dispatch=>{

    //clear out UI comment errors once the user makes the correction:
    dispatch(clearErrors()); //method is below in this file

    axios
        .post(`/api/posts/comment/${postId}`, commentData)
        .then(res=>dispatch({
                type: GET_POST,
                payload: res.data
            })
        ).catch(err=>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    )
};

//DELETE A COMMENT

export const deleteComment =(postId, commentId)=>dispatch=>{

    axios
        .delete(`/api/posts/comment/${postId}/${commentId}`)
        .then(res=>dispatch({
                type: GET_POST,
                payload: res.data
            })
        ).catch(err=>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    )
};


//Set Post Loading STATE

export const setPostLoading =() => {
    return{
        type: POST_LOADING,
    }
};


// CLEAR ERRORS : Used to clear UI errors displayed once the error is fixed

export const clearErrors =() => {
    return{
        type: CLEAR_ERRORS,
    }
};

