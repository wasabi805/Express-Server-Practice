import {createStore, applyMiddleware, compose} from 'redux'; // import from redux
import thunk from 'redux-thunk'; //import thunk
import rootReducer from './reducers'; //import the root reducer, then pass into createStore as 1st param

const middleware = [thunk]; // made const to pass into applyMiddleware()
const initialState = {}; // define so I can pass into createStore



const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // this lengthy line is used to implement the Redux dev tool ext.
        )); // used spread operator for middleware


//send the store back to App.js so we can access it there
export default store;