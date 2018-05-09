import React from 'react';
import {Component} from 'react';

import axios from 'axios';
import classnames from 'classnames';

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

        console.log(newUser, '<========');

        //1st param is the route to register in express server (see routes/api/users.js ln 23)
        axios.post('/api/users/register',newUser)
            .then(res=> console.log(res.data))
            .catch(err=> this.setState({
                errors : err.response.data
            }))

        // For reference ==used to be..=> .catch(err=>console.log(err.response.data))
        // move the errors from error obj{} created in backend to change init state of errors{} from state inside constructor.
        // if there is an error, the form box will turn red
    }

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

                            {/*added noValidate as an attr to remove default HTML5 validations*/}
                            <form noValidate onSubmit={this.onSubmit}>

                                <div className="form-group">

                                    <input type="text"
                                           // className="form-control form-control-lg" //==> for reference of what className used to be..
                                           className={classnames('form-control form-control-lg',
                                               {'is-invalid': errors.name}
                                               )}
                                           //Note for ln above: 'is-invalid' will only appear if errors.name exists / if there is is a name, then the name error will not exist.
                                            // Remember that errors.name originates from validation/register from the backend (ln 22-24 or 28-30) depending on which error
                                           placeholder="Name"
                                           name="name"
                                           value={this.state.name}
                                           onChange={this.onChange}
                                    />

                                    {/*insert the error for the user to view on client side*/}
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

export default Register