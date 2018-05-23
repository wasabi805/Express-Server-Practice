import React from 'react';
import { connect } from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({component: Component, auth, ...rest})=>(
    //LOGIC
    <Route
        {...rest}
        render ={props =>
            auth.isAuthenticated === true ?(
                <Component {...props}/> //ternary
                ) : (
                    <Redirect to='/login'/>
            )//else...redirect to login
        }

    />
);

const mapStateToProps=(state)=>({
  auth: state.auth
});

PrivateRoute.protoTypes={
  auth : PropTypes.object.isRequired
};

export default connect(mapStateToProps)(PrivateRoute) ;