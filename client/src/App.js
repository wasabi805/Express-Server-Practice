import React, { Component } from 'react';

import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux'; //Provider provides the store and needs to wrap around everything
import store from './store'; // imported store from client/store.js

import  './App.css';
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {logoutUser, setCurrentUser} from "./actions/authActions";



//Check for token
if(localStorage.jwtToken){
    //set auth token header auth
    setAuthToken(localStorage.jwtToken); //<==remember that token is stored in localStorage
    //DECODE token, grab user info, and grab token expiration
    const decoded = jwt_decode(localStorage.jwtToken); //<== pass in token

    //SET THE USER AND isAutheticated
    //now, call the setCurrentUser ACTION ==> from client/src/actions/authActions.js
    store.dispatch(setCurrentUser(decoded));


    //Check for expired token
    const currentTime= Date.now() / 1000; //<== 1000 because time is in milliseconds

    if(decoded.exp < currentTime){ //exp because remember in the decoded, we have the exp value...
        //then logout the user
        store.dispatch(logoutUser());
        //  Clear the current profile
        //redirect to Login
        window.location.href="/login"
    }


}





class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <Router>
              <div className="App">
                  <Navbar/>
                    <Route exact path="/" component={ Landing }/>


                  <div className="container">
                      <Route exact path='/register' component={ Register }/>
                      <Route exact path='/login' component={ Login }/>
                  </div>
                  <Footer/>
              </div>
            </Router>
        </Provider>
    );
  }
}

export default App;
