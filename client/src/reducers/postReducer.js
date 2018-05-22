import {ADD_POST, GET_POSTS, POST_LOADING, DELETE_POST} from "../actions/types";


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

        //remember that post id is coming in through the payload ==> we want to remove the post from [] via the post id
        case DELETE_POST:
            return{
                ...state,
                posts: state.posts.filter(post=> post._id !== action.payload)
                //deletion occurs LOCALLY , within the UI
            };


        default:
            return state
    }



}