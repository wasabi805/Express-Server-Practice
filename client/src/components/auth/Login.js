import React from 'react';
import {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginUser} from "../../actions/authActions";
import classnames from 'classnames';

import TextFieldGroup from "../common/TextFieldGroup"



class Login extends Component{

    constructor(){
        super();
        this.state={

            email: '',
            password: '',
            errors: {},
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    //Prevent user from seeing login page if they are already logged in
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard')
        }
    }



    componentWillReceiveProps(nextProps){

        //check if isAuthenticated is true, redirect to the dashboard
        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/dashboard') // since we are currently still in the comp, we can use history
        }

        //if fail auth
        if(nextProps.errors){
            this.setState({
                errors : nextProps.errors
            })
        }

    };


    onChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();

        const userData ={
            email: this.state.email,
            password: this.state.password,
        };

        console.log(userData, '<==== from Login.js, onSubmit()');

        this.props.loginUser(userData); //<== pass in form submit, NOW it will call loginUser() from actions/authActions.js

    }


    render(){

        const {errors} = this.state; // remember that the errors come in as props from the reducer
                                    //  then, we'll USE COMP willReceiveProps TO MAP IT BACK TO THE STATE
                                    // in order to render the props we receive (the errors) under the form inputs

        return(
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">Sign in to your DevConnector account</p>

                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="Email Address"
                                    name='email'
                                    type='email'
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    error={errors.email}
                                />

                                <TextFieldGroup
                                    placeholder="Password"
                                    name='password'
                                    type='password'
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    error={errors.password}
                                />

                                <input type="submit"
                                       className="btn btn-info btn-block mt-4" />

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

//REMEMBER THAT ACTIONS ARE ALSO Properties
Login.propTypes={
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired,
};

const mapStateToProps=(state)=>({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {loginUser})(Login);