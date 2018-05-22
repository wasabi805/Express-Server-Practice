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

        console.log(this.props.profile + "****************");

        let matchProfHandle = this.props.match.params.handle;

        console.log(matchProfHandle,'<---------');

        if(this.props.match.params.handle){
            this.props.getProfileByHandle(this.props.match.params.handle)
        }
    };


    render(){
        return(
            <div>
                <ProfileHeader/>
                <ProfileAbout/>
                <ProfileCreds/>
                <ProfileGitHub/>
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