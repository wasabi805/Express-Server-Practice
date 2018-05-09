import {TEST_DISPATCH} from "../actions/types";


const initialState = {
    
    isAuthenticated : false,
    user: {
      
    }
};

export default function (state= initialState, action) {
    switch (action.type){

        case TEST_DISPATCH:
            return{
                ...state,
                user: action.payload // user us from the initial state i this reducer
                                    //  value comes from registeruser()'s payload in authActions.js
            };

        default:
            return state;
    }
}