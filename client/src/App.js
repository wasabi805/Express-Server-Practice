import React, { Component } from 'react';

import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux'; //Provider provides the store and needs to wrap around everything
import store from './store'; // imported store from client/store.js

import './App.css';
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

// ===========  FOR REDUX   ===========
//wrap EVERYTHING in the provider (ln 33 && 47)

//          Create the store

// To make the store, we need below..
// const store = createStore(()=> [], {}, applyMiddleware());

//  1st param : the root reducer ==>[]
//  2nd param : the initial state ==> {}
//  3rd param : the middleware ===> applyMiddleware());
//  see Arguments @  https://github.com/reactjs/redux/blob/master/docs/api/createStore.md  for more details

// For configuring store, we don't want it in this file so we'll give it it's own file for breathing room and import it
//back into App.js

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <Router>
              <div className="App">
                  <Navbar/>
                    <Route exact path="/" component={ Landing }/>
                  <Footer/>

                  <div className="container">
                      <Route exact path='/register' component={ Register }/>
                      <Route exact path='/login' component={ Login }/>
                  </div>

              </div>
            </Router>
        </Provider>
    );
  }
}

export default App;
