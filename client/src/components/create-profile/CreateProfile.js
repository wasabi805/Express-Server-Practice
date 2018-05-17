import React from 'react';
import {Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import {createProfile} from '../../actions/profileActions';


class CreateProfile extends Component{

    constructor(props){
        super(props);
        this.state={
            // displaySocialInputs: false, // moved this down for destructuring:
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
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps){
        //if there are error
        if(nextProps.errors){
            this.setState({
                errors : nextProps.errors // if there are errors, add them to the errors{} (ln 55 of this file)
            })
        }
    }

    onSubmit(e){
        e.preventDefault();

        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram,

        };

        this.props.createProfile(profileData, this.props.history) //pass in history so redirect can occur

    }

    onChange(e){
        this.setState({[e.target.name] : e.target.value})
    }

    render(){

        const {errors, displaySocialInputs} = this.state;

        //Init displaySocialInputs var
        let socialInputs;

        //check the state to see if we will display the displaySocialInputs when btn is pressed
        if(displaySocialInputs){
            socialInputs = (
                <div>

                    <InputGroup
                        placeholder='Twitter Profile URL'
                        name='twitter'
                        icon="fab fa-twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                    />

                    <InputGroup
                        placeholder='Linkedin Profile URL'
                        name='linkedin'
                        icon="fab fa-linkedin"
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}
                    />

                    <InputGroup
                        placeholder='YouTube Profile URL'
                        name='youtube'
                        icon="fab fa-youtube"
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube}
                    />

                    <InputGroup
                        placeholder='Instagram Profile URL'
                        name='instagram'
                        icon="fab fa-instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                    />



                </div>
            )
        }
       
        //Select options for status (default state for options)
        const options = [
            {label: '* Select Professional Status ', value: 0,},
            {label: 'Junior Developer', value: 'Junior Developer'},
            {label: 'Senior Developer', value: 'Senior Developer'},
            {label: 'Manager', value: 'Manager'},
            {label: 'Student or Learning', value: 'Student or Learning'},
            {label: 'Instructor or Teacher', value: 'Instructor or Teacher'},
            {label: 'Intern', value: 'Intern'},
            {label: 'Other', value: 'Other'},
        ];

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

                           <form onSubmit={this.onSubmit}>

                                <TextFieldGroup
                                    placeholder="* Profile Handle"
                                    name="handle"
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info="A unique handle for your profileURL : Your full name, company name, nickname."
                                />

                               <SelectListGroup
                                   placeholder="Status"
                                   name="status"
                                   value={this.state.status}
                                   options={options}
                                   onChange={this.onChange}
                                   error={errors.status}
                                   info="Give us an idea of where you are at in your career."
                               />

                               <TextFieldGroup
                                   placeholder="Company"
                                   name="company"
                                   value={this.state.company}
                                   onChange={this.onChange}
                                   error={errors.company}
                                   info="Could be your own company or one that you work for."
                               />

                               <TextFieldGroup
                                   placeholder="Website"
                                   name="website"
                                   value={this.state.website}
                                   onChange={this.onChange}
                                   error={errors.website}
                                   info="Could be your own website or a company one."
                               />

                               <TextFieldGroup
                                   placeholder="Location"
                                   name="location"
                                   value={this.state.location}
                                   onChange={this.onChange}
                                   error={errors.location}
                                   info="City or city & state suggested(eg. San Jose, CA)."
                               />

                               <TextFieldGroup
                                   placeholder="Skills"
                                   name="skills"
                                   value={this.state.skills}
                                   onChange={this.onChange}
                                   error={errors.skills}
                                   info="Please use comma separated values (eg. HTML,CSS, JavaScript, PHP)."
                               />

                               <TextFieldGroup
                                   placeholder="Github handle"
                                   name="githubusername"
                                   value={this.state.githubusername}
                                   onChange={this.onChange}
                                   error={errors.githubusername}
                                   info="If you want your latest repos and Github link, include your username."
                               />

                               <TextAreaFieldGroup
                                    placeholder='Short Bio'
                                    name='bio'
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    error={errors.bio}
                                    info="Tell us a little something about yourself."
                               />

                                {/*Social Media stuff*/}

                                {/*Note: this.setState toggles the display of the social stuff ==> fb, twitter, linkedin etc..*/}
                                <div className="mb-3">
                                    <button
                                        type='button'
                                        className='btn btn-light'

                                        onClick={()=>{
                                            this.setState(prevState => ({
                                                displaySocialInputs: !prevState.displaySocialInputs
                                            }))
                                        }}
                                    >
                                        Add Social Network Links
                                    </button>

                                    <span className='text-muted'>Optional</span>
                                </div>

                               {/*Display Social Inputs*/}
                               {socialInputs}
                               <input
                                    type='submit'
                                    value='submit'
                                    className='btn btn-info btn-block mt-4'
                               />

                           </form>

                       </div>
                   </div>
               </div>
            </div>
        )
    }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors

});

export default connect(mapStateToProps, {createProfile})(withRouter(CreateProfile));



