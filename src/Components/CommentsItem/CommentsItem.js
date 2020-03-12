import React, { Component } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Hyph } from '../Utils/Utils';
import StyleIcon from '../StyleIcon/StyleIcon';
import { getUserNameForPost } from '../../services/helperFunctions'
import './CommentsItem.css';

export default class CommentsItem extends Component {
    render() {
        const { comment, users } = this.props
        return (
            <Link to={`/comments/${comment.id}`} className='CommentsItem'>
                <main className='CommentsItem__header'>
                    <p className='CommentsItem__heading'>
                        {comment.comment}
                    </p>
                    {/* {post.posted} */}
                    <CommentDate comment={comment.posted} />
                    <section className='CommentsItem__footer'>
                        <CommentStyle comment={comment} />
                        {comment.userid && <>
                            <Hyph />
                            <CommentAuthor comment={comment} users={users} />
                        </>}
                    </section>
                </main>

            </Link>
        )
    }
}


function CommentStyle({ comment }) {
    return (
        <span className='CommentItem__style'>
            <StyleIcon style={comment.style} />
            {' '}
            {comment.style}
        </span>
    )
}

function CommentDate({ comment }) {

    return (
        <span className='CommentItem__date'>
            {format(new Date(comment), "do MMM YYYY")}
        </span>
    )
}

function CommentAuthor({ comment, users }) {
    let userId = comment.userid;
    return (
        <span className='CommentItem__author'>
            {getUserNameForPost(userId, users)}
        </span>
    )
}




