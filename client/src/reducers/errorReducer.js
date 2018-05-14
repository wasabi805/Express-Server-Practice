import {GET_ERRORS} from "../actions/types";


const initialState = {};


export default function (state= initialState, action) {
    switch (action.type){

        case GET_ERRORS:
            return action.payload; //<== Remember: this payload comes from client/src/actions/authActions ln(15)
                                    //   from ln 15 of that file, the payload is err.response.data ==> which err.response.data came from the server

        default:
            return state;
    }
};