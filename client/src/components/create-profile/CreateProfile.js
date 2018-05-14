import React from 'react';
import {Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup';


class CreateProfile extends Component{

    constructor(props){
        super(props);
        this.state={
            displaySocialInputs: false, // since they will toggle in display, init state= false
            handle: '',
            company: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors:{}
        }
    }
    render(){
        /*.m-auto places the column in the middle*/
        /*display as block, padding == 3 */
        return(
            <div className='create-profile'>
               <div className='container'>
                   <div className='row'>
                       <div className='col-md-8 m-auto'>
                            <h1 className='display-4 text-center'>Create Your Profile</h1>
                            <p className="lead text-center">
                                Let's get some information to make your profile stand out
                            </p>
                            <small className='d-block pb-3'>
                                * = required fields
                            </small>
                       </div>
                   </div>
               </div>
            </div>
        )
    }
}

CreateProfile.propTypes = {
    profile: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors

});

export default connect(mapStateToProps)(CreateProfile);



