import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NiceDate, Hyph } from '../Utils/Utils'
import StyleIcon from '../StyleIcon/StyleIcon'
import './PostListItem.css'

export default class PostListItem extends Component {
    render() {
        const { post } = this.props
        return (
            <Link to={`/post/${post.id}`} className='PostListItem'>
                <header className='PostListItem__header'>
                    <h2 className='PostListItem__heading'>
                        {post.title}
                    </h2>
                    <PostDate post={post} />
                </header>
                <footer className='PostListItem__footer'>
                    <PostStyle post={post} />
                    {post.author.id && <>
                        <Hyph />
                        <PostAuthor post={post} />
                    </>}
                    <PostCommentCount post={post} />
                </footer>
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
    return (
        <span className='PostListItem__date'>
            <NiceDate
                date={post.date_created}
            />
        </span>
    )
}

function PostAuthor({ post }) {
    return (
        <span className='PostListItem__author'>
            {post.author.full_name}
        </span>
    )
}

function PostCommentCount({ post }) {
    return (
        <span
            className='PostListItem__comment-count fa-layers fa-fw'
        >
            <FontAwesomeIcon size='lg' icon='comment' />
            <span
                className='fa-layers-text fa-inverse'>
                {post.number_of_comments}
            </span>
        </span>
    )
}
