import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Hyph } from '../Utils/Utils'
import StyleIcon from '../StyleIcon/StyleIcon'
import { countCommentsForPost } from '../../services/helperFunctions';
import './PostListItem.css'
import { format } from 'date-fns'

export default class PostListItem extends Component {

    render() {
        const { post, comments } = this.props
        return (
            <Link to={`/posts/${post.id}`} className='PostListItem'>
                <main className='PostListItem__header'>
                    <h2 className='PostListItem__heading'>
                        {post.post}
                    </h2>
                    {/* {post.posted} */}
                    <PostDate post={post.posted} />
                    <ul className='PostListItem__footer'>
                        <li><PostStyle post={post} />
                            {post.userid && <>
                                <Hyph />
                                <PostAuthor post={post} />
                            </>}
                        </li>
                        <li> <span
                            className='PostListItem__comment-count fa-layers fa-fw'
                        >
                            <FontAwesomeIcon size='lg' icon='comment' />
                            <span
                                className='fa-layers-text fa-inverse'>
                                {countCommentsForPost(comments, post.id)}
                            </span>
                        </span>
                        </li>
                    </ul>
                </main>

            </Link>
        )
    }
}

function PostStyle({ post }) {
    return (
        <span className='PostListItem__style'>
            <StyleIcon style={post.style} />
            {' '}
            {post.style}
        </span>
    )
}

function PostDate({ post }) {
    // let date = new Date(post.posted);
    return (
        <span className='PostListItem__date'>
            {format(new Date(post), "do MMM YYYY")}
        </span>
    )
}

function PostAuthor({ post }) {
    return (
        <span className='PostListItem__author'>
            {post.userid}
        </span>
    )
}


