import React from 'react';
import {Component} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import {registerUser} from "../../actions/authActions";

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

        //the line below is the same thing as :
        // const errors = this.state.errors ==> think of it as, "you can pull errors out of this.state."

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

                                    <input type="text"
                                           className={classnames('form-control form-control-lg',
                                               {'is-invalid': errors.name}
                                               )}
                                           placeholder="Name"
                                           name="name"
                                           value={this.state.name}
                                           onChange={this.onChange}
                                    />
                                    {errors.name && (<div className="invalid-feedback">{errors.name} </div>)}

                                </div>

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

                                    <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
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


                                <div className="form-group">
                                    <input type="password"
                                           className={classnames('form-control form-control-lg',
                                               {'is-invalid': errors.password2}
                                           )}
                                           placeholder= "Confirm Password"
                                           name="password2"
                                           value={this.state.password2}
                                           onChange={this.onChange}
                                    />
                                    {errors.password2 && (<div className="invalid-feedback">{errors.password2} </div>)}
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