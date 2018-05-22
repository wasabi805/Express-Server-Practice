import {ADD_POST} from "../actions/types";


const initialState={
    posts: [],
    post: {},
    loading: false
};

export default function (state=initialState, action) {

    switch(action.type){
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