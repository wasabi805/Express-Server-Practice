import React, { Component } from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux'; //Provider provides the store and needs to wrap around everything
import store from './store'; // imported store from client/store.js
import  './App.css';
import PrivateRoute from "./components/common/PrivteRoute";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import NotFound from './components/not-found/NotFound';

import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {logoutUser, setCurrentUser} from "./actions/authActions";
import {clearCurrentProfile} from "./actions/profileActions";




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
        store.dispatch(clearCurrentProfile);

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
                      <Route exact path='/profiles' component={Profiles}/>
                      <Route exact path='/profile/:handle' component={Profile}/>

                      <Switch>
                        <PrivateRoute exact path='/dashboard' component={ Dashboard }/>
                      </Switch>

                      <Switch>
                          <PrivateRoute exact path='/create-profile' component={ CreateProfile }/>
                      </Switch>

                      <Switch>
                          <PrivateRoute exact path='/edit-profile' component={ EditProfile }/>
                      </Switch>

                      <Switch>
                          <PrivateRoute exact path='/add-experience' component={ AddExperience }/>
                      </Switch>

                      <Switch>
                          <PrivateRoute exact path='/add-education' component={ AddEducation }/>
                      </Switch>

                      <Switch>
                          <PrivateRoute exact path='/feed' component={ Posts }/>
                      </Switch>

                      <Switch>
                          <PrivateRoute exact path='/post/:id' component={ Post }/>
                      </Switch>

                      <Route exact path='/not-found' component={ NotFound }/>

                  </div>
                  <Footer/>
              </div>
            </Router>
        </Provider>
    );
  }
}

export default App;
