import React from 'react';
import {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginUser} from "../../actions/authActions";
import classnames from 'classnames';



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
                                <div className="form-group">
                                    <input type="email"
                                           className={classnames('form-control form-control-lg',
                                               {'is-invalid': errors.email}
                                           )}
                                           placeholder="Email Address"
                                           name="email"
                                           value={this.state.email}
                                           onChange={this.onChange}
                                    />
                                    {errors.email && (<div className="invalid-feedback">{errors.email} </div>)}
                                </div>

                                <div className="form-group">
                                    <input type="password"

                                           className={classnames('form-control form-control-lg',
                                               {'is-invalid': errors.password}
                                           )}

                                           placeholder="Password"
                                           name="password"
                                           value={this.state.password}
                                           onChange={this.onChange}
                                    />
                                    {errors.password && (<div className="invalid-feedback">{errors.password} </div>)}
                                </div>

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