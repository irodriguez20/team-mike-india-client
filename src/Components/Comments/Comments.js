import React, { Component } from 'react';
import NavBarContext from '../../contexts/NavBarContext';
import { Section } from '../Utils/Utils';
import CommentsItem from '../../Components/CommentsItem/CommentsItem';
import PostApiService from '../../services/post-api-service';
import PropTypes from 'prop-types';
import { getCommentsForPost } from '../../services/helperFunctions';

class Comments extends Component {
    static defaultProps = {
        match: { params: {} },
    }
    // state = {
    //     userid: this.context.userid,
    //     userName: this.context.userName,
    // }

    static contextType = NavBarContext;


    componentDidMount() {
        this.context.clearError()
        PostApiService.getComments()
            .then(this.context.setComments)
            .catch(this.context.setError)

        console.log(this.context.comments)

    }

    renderComments() {
        const { comments = [] } = this.context
        const postId = parseInt(this.props.postId);
        const commentsForPost = getCommentsForPost(comments, postId);

        return (
            <>
                <h3>Comments</h3>
                {commentsForPost.map(comment =>
                    <CommentsItem
                        key={comment.id}
                        comment={comment}
                    />)}
            </>
        )
    }

    render() {
        const { error } = this.context
        return (
            <>
                <div className="Comments__div">
                    <Section list className='CommentsList'>
                        {error
                            ? <p className='red'>There was an error, try again</p>
                            : this.renderComments()}
                    </Section>
                </div>
            </>
        )
    }
}

export default Comments;