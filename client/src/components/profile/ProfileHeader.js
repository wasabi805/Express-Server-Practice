import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class ProfileHeader extends Component{
    render(){
        return(
            <div>
                <h1>PROFILE HEADER TODO</h1>
            </div>
        )
    }
}

const mapStateToProps =(state)=>({

});

ProfileHeader.propTypes={
    profile: PropTypes.object.isRequired
};

export default connect(null)(ProfileHeader)