import axios from 'axios';
import {ADD_POST, DELETE_POST, GET_ERRORS, GET_POSTS, POST_LOADING} from "./types";


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




//Set Post Loading STATE

export const setPostLoading =() => {
    return{
        type: POST_LOADING,
    }
};

