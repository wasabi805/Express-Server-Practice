import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class ProfileGitHub extends Component{
    render(){
        return(
            <div>
                <h1>PROFILE CREDS TODO</h1>
            </div>
        )
    }
}

const mapStateToProps =(state)=>({

});

ProfileGitHub.propTypes={
    profile: PropTypes.object.isRequired
};

export default connect(null)(ProfileGitHub)