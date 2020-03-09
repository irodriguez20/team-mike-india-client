import React, { Component } from 'react';
import NavBarContext from '../../contexts/NavBarContext';
import { Section } from '../Utils/Utils';
import CommentsItem from '../../Components/CommentsItem/CommentsItem';
import PostApiService from '../../services/post-api-service';
import PropTypes from 'prop-types';

class Comments extends Component {
    // static defaultProps = {
    //     match: { params: {} },
    // }
    static propTypes = {
        history: PropTypes.shape({
            push: () => { },
            match: { params: {} },
        }).isRequired,
    };

    static contextType = NavBarContext;

    findComments = ({ commentsList, postId }) => {
        console.log(commentsList)
        commentsList.find(comment => comment.postid === postId)
        // if (comment.postid === id) {
        //     commentsList.push()
        // }
    }

    componentDidMount() {
        this.context.clearError()
        PostApiService.getComments()
            .then(this.context.setComments)
            .catch(this.context.setError)

        console.log(this.context.comments)
    }

    renderComments() {
        const { commentsList = [] } = this.context
        const postId = parseInt(postId);

        console.log('renderComments()', commentsList);

        this.findComments({ commentsList, postId })

        return commentsList.map(comment =>
            <CommentsItem
                key={comment.id}
                comment={comment}
            />
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