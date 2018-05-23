import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import {getPost} from "../../actions/postActions";
import PostItem from '../posts/PostItem'


class Post extends Component{

    componentDidMount(){
        //pass in the id of the single post
        let postId = this.props.match.params.id;

        this.props.getPost(postId);
    };

    render(){

        //LOAD SPINNER
        const {post, loading} = this.props.post;

        let postContent;
                                        //this checks to see the post{} itself is not empty
        if(post === null || loading || Object.keys(post).length === 0){
            postContent = <Spinner/>
        }
        else{

            postContent = (
                <div>
                    {/*set to false to revent <PostItem/> from rendering like buttons and comments  */}
                    <PostItem post={post} showActions={false}/>
                </div>
            )
        }


        return(
            <div className='post'>
               <div className='container'>
                   <div className='row'>
                       <div className='col-md-12'>
                           <Link to={'/feed'} className='btn btn-light mb-3'>
                                Back to Feed
                           </Link>
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


Post.propTypes={
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {getPost})(Post)