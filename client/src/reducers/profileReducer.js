import {GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE} from "../actions/types";

const initialState = {
    profile: null,
    profiles : null,
    loading : false, // will fetch profiles: once profiles fetched, this should reset back to initial state of false
    
};

export default function (state= initialState, action) {
    switch(action.type){

        case PROFILE_LOADING:   //all this case does is define that the profile is loading
            return{
                ...state,
                loading: true,
            };

        case GET_PROFILE:       //this will get the profile while the PROFILE_LOADING case runs
            return{
                ...state,
                profile: action.payload,
                loading: false // profile was grabbed so.. loading == false
            };

        case CLEAR_CURRENT_PROFILE:
            return{
                ...state,
                profile: null,
            };

        default:
            return state
    }
}