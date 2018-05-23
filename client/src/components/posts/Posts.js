import React, {Component} from 'react';
import {connect} from 'react-redux';
import PostForm from './PostForm';
import Spinner from '../common/Spinner';
// import PropTypes from 'prop-types';



class Posts extends Component{
    render(){
        return(
            <div className='feed'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <PostForm />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps={

};




export default Posts