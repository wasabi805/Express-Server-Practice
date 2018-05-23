import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {deleteComment} from '../../actions/postActions';


class CommentItem extends Component{

    onDeleteClick(postId, commentId){
        this.props.deleteComment(postId,commentId)
    };

    render(){

        const {comment, postId, auth} = this.props;

        return(
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <a href="profile.html">

                            {/*Avatar*/}
                            <img
                                className="rounded-circle d-none d-md-block"
                                src={comment.avatar}
                                alt=""
                            /></a><br />

                        {/*User Name*/}
                        <p className="text-center">{comment.name}</p>
                    </div>

                    <div className="col-md-10">

                        {/*Comment Text*/}
                        <p className="lead">
                            {comment.text}
                        </p>

                        {/*DELETE comment btn : NOTE: renders only if comment belongs to logged in user*/}
                        {comment.user === auth.user.id ? (
                            <button
                                type="button"
                                className='btn btn-danger mr-1'
                                onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                            >
                                <i className='fas fa-times'></i>

                            </button>) : null}

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>({
    auth: state.auth,
});

CommentItem.propTypes={
    auth: PropTypes.object.isRequired,
    deleteComment : PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, {deleteComment})(CommentItem)