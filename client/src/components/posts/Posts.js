import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import PostForm from './PostForm';
import {getPosts} from "../../actions/postActions";
import PostFeed from './PostFeed';

import Spinner from '../common/Spinner';
// import PropTypes from 'prop-types';



class Posts extends Component{

    componentDidMount(){
        this.props.getPosts();
    };

    render(){

        const {posts, loading} = this.props.post;

        let postContent;

        //display spinner

        if(posts === null || loading){
            postContent = (<Spinner/>)
        }
        else{
            //display post feed
            postContent = <PostFeed posts={posts}/>
        }

        return(
            <div className='feed'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <PostForm />
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps=(state)=>({
    post: state.post
});

Posts.propTypes={
    post: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired,
};

export default connect(mapStateToProps,{getPosts})(Posts)