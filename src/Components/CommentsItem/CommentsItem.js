import React, { Component } from 'react';
import { format } from 'date-fns';
import { Hyph } from '../Utils/Utils';
import StyleIcon from '../StyleIcon/StyleIcon';
import { getUserNameForPost } from '../../services/helperFunctions'
import './CommentsItem.css';

export default class CommentsItem extends Component {
    render() {
        const { comment, users } = this.props
        return (
            <div className='CommentsItem'>
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

            </div>
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
            {format(new Date(comment), "DD MMM YYYY")}
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




