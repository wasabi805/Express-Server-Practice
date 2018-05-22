import {ADD_POST, GET_POSTS, POST_LOADING} from "../actions/types";


const initialState={
    posts: [],
    post: {},
    loading: false
};

export default function (state=initialState, action) {

    switch(action.type){

        //for the spinner
        case POST_LOADING:
            return{
                ...state,
                loading : true,
            };

        //once we get the posts....
        case GET_POSTS:
            return{
                ...state,
                posts: action.payload,
                loading: false
            };

        // This will automatically add the new post to []
        case ADD_POST:
            return{
                ...state,
                posts:[action.payload, ...state.posts]
            };


        default:
            return state
    }



}