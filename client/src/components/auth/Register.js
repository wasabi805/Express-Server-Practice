import React from 'react';
import {Component} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {registerUser} from "../../actions/authActions";
import TextField from "../common/TextFieldGroup"

class Register extends Component{

    constructor(){
        super();
        this.state={
            name: '',
            email: '',
            password: '',
            password2: '',
            errors:{}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };

    //LIFECYCLE METHODS

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard')
        }
    }

    //this will run when the register comp receives new props
    //  method takes in param called nextProps
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){ //if there are errors
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    onChange(e){
        this.setState({[e.target.name] : e.target.value})
    }

    //Expanded onSubmit to make post req to back end route for register and pass in newUser from this file.
    onSubmit(e){
        e.preventDefault(); //used for forms

        const newUser ={

            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };


        this.props.registerUser(newUser, this.props.history) //<==== pass the form data from newUser into registerUser
                                                            // ALSO, add 2nd param of this.props.history ==> required to redirect after registration success
    }                                                           // see: connect at the bottom of this file.
                                                                // remember, this is all being done so we can make an automatic redirect from an action
    render(){

        const { errors } = this.state;

        return(
            <div className="register">

                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your DevConnector account</p>


                            <form noValidate onSubmit={this.onSubmit}>

                                <div className="form-group">
                                    <TextField
                                        placeholder='Name'
                                        name="name"
                                        // type="" //don't worry about passing in anything, default for type == text
                                        value={this.state.name}
                                        onChange={this.onChange}
                                        error={errors.name}
                                    />
                                </div>

                                <div className="form-group">
                                    <TextField
                                        placeholder='Email'
                                        name="email"
                                        type="email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                        error={errors.email}
                                        info="This site uses Gravatar so if you want a profile image, use a Gravatar account "
                                    />
                                </div>

                                <div className="form-group">
                                    <TextField
                                        placeholder='Password'
                                        name="password"
                                        type="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        error={errors.password}
                                    />
                                </div>

                                <div className="form-group">
                                    <TextField
                                        placeholder='Confirm password'
                                        name="password2"
                                        type="password"
                                        value={this.state.password2}
                                        onChange={this.onChange}
                                        error={errors.password2}
                                    />
                                </div>

                                <input type="submit"
                                       className="btn btn-info btn-block mt-4"

                                />

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Register.propTypes ={
    registerUser : PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};


const mapStateToProps = (state)=>({
    auth : state.auth, //<== auth state(the value from the root reducer) goes into a props called auth(the key)
    errors : state.errors //the errors obj
});


export default connect(mapStateToProps, {registerUser})(withRouter(Register));