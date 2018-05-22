import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class ProfileAbout extends Component{
    render(){
        return(
            <div>
                <h1>PROFILE ABOUT TODO</h1>
            </div>
        )
    }
}

const mapStateToProps =(state)=>({

});

ProfileAbout.propTypes={
    profile: PropTypes.object.isRequired
};

export default connect(null)(ProfileAbout)