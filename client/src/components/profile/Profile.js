import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGitHub from './ProfileGithub';

import Spinner from '../common/Spinner';

import {getProfileByHandle} from "../../actions/profileActions";


class Profile extends Component{

    componentDidMount(){

        // let matchProfHandle = this.props.match.params.handle;

        if(this.props.match.params.handle){
            this.props.getProfileByHandle(this.props.match.params.handle)
        }
    };

    //HANDLES PROFILE NOT FOUND
    componentWillReceiveProps(nextProps){

        //check if nextProps == null
        if(nextProps.profile.profile === null && this.props.profile.loading){
            //then redirect
            this.props.history.push('/not-found')
        }
    };


    render(){

        const {profile, loading} = this.props.profile;
        let profileContent;

        //               CONDITIONAL RENDERING
        //logic below: check if profile is null or loading: if so, render spinner
        if(profile === null || loading){
            profileContent = <Spinner/>

        }
        else{
            profileContent =(
                <div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <Link
                             to={'/profiles'}
                                className='btn btn-light mb-3 float-lft'
                            >
                             Back To Profiles
                            </Link>
                        </div>
                        <div className='col-md-6'/>
                    </div>

                    <ProfileHeader profile={profile}/>
                    <ProfileAbout profile={profile}/>
                    <ProfileCreds
                        education={profile.education}
                        experience={profile.experience}
                    />

                    {profile.githubusername ? ( <ProfileGitHub username={profile.githubusername}/>) : null }

                </div>
            );
        }

        return(
            <div className='profile'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            {profileContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps =(state)=>({
    profile: state.profile,
});

Profile.propTypes={
    profile: PropTypes.object.isRequired,
    getProfileByHandle: PropTypes.func.isRequired,

};

export default connect(mapStateToProps,{getProfileByHandle})(Profile)