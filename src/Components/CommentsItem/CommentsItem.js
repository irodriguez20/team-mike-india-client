import React, { Component } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Hyph } from '../Utils/Utils';
import StyleIcon from '../StyleIcon/StyleIcon';
import './CommentsItem.css';

export default class CommentsItem extends Component {
    render() {
        const { comment } = this.props
        return (
            <Link to={`/comments/${comment.id}`} className='CommentsItem'>
                <main className='CommentsItem__header'>
                    <h2 className='CommentsItem__heading'>
                        {comment.comment}
                    </h2>
                    {/* {post.posted} */}
                    <CommentDate comment={comment.posted} />
                    <section className='CommentsItem__footer'>
                        <CommentStyle comment={comment} />
                        {comment.userid && <>
                            <Hyph />
                            <CommentAuthor comment={comment} />
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
    // let date = new Date(post.posted);
    return (
        <span className='CommentItem__date'>
            {format(new Date(comment), "do MMM YYYY")}
        </span>
    )
}

function CommentAuthor({ comment }) {
    return (
        <span className='CommentItem__author'>
            {comment.userid}
        </span>
    )
}




