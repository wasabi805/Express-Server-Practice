import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Link} from 'react-router-dom';


class PostItem extends Component{

    onDeleteClick(id){
        console.log(id)
    };


    render(){

        const {post, auth} = this.props;

        console.log({post})

        return(
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <a href="profile.html">

                            {/*THE USER AVATAR*/}
                            <img className="rounded-circle d-none d-md-block"
                                 src={post.avatar}
                                 alt="" />
                        </a>
                        <br />

                            {/*THE USER NAME*/}
                        <p className="text-center">{post.name}</p>
                    </div>


                    <div className="col-md-10">
                            {/*The USER's POST*/}
                        <p className="lead">
                            {post.text}
                           </p>

                            {/*Likes Btn*/}
                        <button type="button" className="btn btn-light mr-1">

                            <i className="text-info fas fa-thumbs-up"></i>
                            <span className="badge badge-light">
                                {/*LIKE COUNT*/}
                                {post.likes.length}
                                </span>
                        </button>

                        <button type="button" className="btn btn-light mr-1">
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


PostItem.propTypes={
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};



export default connect(mapStateToProps)(PostItem)


// (<button type='button' onClick={this.onDeleteClick.bind(this, post._id)} className='btn btn-danger mr-1'>
//     <i className='fas fa-times'/>
// </button>): null