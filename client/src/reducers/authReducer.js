import { SET_CURRENT_USER} from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
    
    isAuthenticated : false,
    user: {
      
    }
};

export default function (state= initialState, action) {
    switch (action.type){

        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload), //if this obj is empty, then user is NOT authenticated.
                user: action.payload,                       //note: will need to create a new file for THIS isEmpty/ just like the back end one created previously.
            };

        default:
            return state;
    }
}