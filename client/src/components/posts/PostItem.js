import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
import {deletePost, addLike, removeLike} from "../../actions/postActions";


class PostItem extends Component{

    onDeleteClick(id){
        this.props.deletePost(id);
    };

    onLikeClick(id){
        this.props.addLike(id);
    }

    onUnlikeClick(id){
        this.props.removeLike(id);
    }

    //verification if like already made
    findUserLike(likes){

        const {auth} = this.props;

        //if true, logged in user already made a like to specific post
        if(likes.filter(like=>like.user === auth.user.id).length>0){
            return true
        }else{
            return false
        }
    }

    render(){

        const {post, auth, showActions} = this.props;

        return(
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <Link to={`profile/${post.name}`}>

                            {/*THE USER AVATAR*/}
                            <img className="rounded-circle d-none d-md-block"
                                 src={post.avatar}
                                 alt="" />
                        </Link>
                        <br />

                            {/*THE USER NAME*/}
                        <p className="text-center">{post.name}</p>
                    </div>


                    <div className="col-md-10">
                            {/*The USER's POST*/}
                        <p className="lead">
                            {post.text}
                           </p>

                        {showActions ? (<span>
                            {/* ADD Like Btn*/}
                            <button type="button" onClick={this.onLikeClick.bind(this, post._id)} className="btn btn-light mr-1">

                            {/*used classnames to turn fa icon green when liked*/}
                                <i className={classnames('fas fa-thumbs-up',{'text-info': this.findUserLike(post.likes)} )}/>

                            <span className="badge badge-light">
                                {/*LIKE COUNT*/}
                                {post.likes.length}
                                </span>
                        </button>

                            {/* REMOVE Like Btn*/}
                            <button type="button" onClick={this.onUnlikeClick.bind(this, post._id)} className="btn btn-light mr-1">
                            <i className="text-secondary fas fa-thumbs-down"></i>
                        </button>

                            {/*COMMENTS : finds by the post._id*/}
                            {/*TODO create the route later*/}

                            <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                            Comments
                        </Link>

                            {post.user === auth.user.id ? (
                                <button
                                    type="button"
                                    className='btn btn-danger mr-1'
                                    onClick={this.onDeleteClick.bind(this, post._id)}
                                >
                                    <i className='fas fa-times'></i>

                                </button>) : null}


                        </span>): null}


                    </div>
                </div>
            </div>
        )
    }
}

//need auth so user can delete their own posts
const mapStateToProps =(state)=>({
    auth: state.auth,

});


PostItem.defaultProps={
  showActions : true
};


PostItem.propTypes={
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,

};


export default connect(mapStateToProps, {deletePost, addLike, removeLike})(PostItem)
