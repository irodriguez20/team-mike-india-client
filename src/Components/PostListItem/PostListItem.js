import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Hyph } from '../Utils/Utils'
import StyleIcon from '../StyleIcon/StyleIcon'
import './PostListItem.css'
import { format } from 'date-fns'
import NavBarContext from '../../contexts/NavBarContext';
import { getUserNameForPost } from '../../services/helperFunctions'

export default class PostListItem extends Component {

    static contextType = NavBarContext;



    render() {
        const { users = [] } = this.context
        const { post } = this.props
        return (
            <Link to={`/posts/${post.id}`} className='PostListItem'>
                <main className='PostListItem__header'>
                    <h2 className='PostListItem__heading'>
                        {post.post}
                    </h2>

                    <PostDate post={post.posted} />
                    <ul className='PostListItem__footer'>
                        <li><PostStyle post={post} />
                            {post.userid && <>
                                <Hyph />
                                <PostAuthor post={post} users={users} />
                            </>}
                        </li>
                        <li> <span
                            className='PostListItem__comment-count fa-fw'
                        >
                            <FontAwesomeIcon size='lg' icon='comment' />
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

    return (
        <span className='PostListItem__date'>
            {format(new Date(post), "do MMM YYYY")}
        </span>
    )
}

function PostAuthor({ post, users }) {
    let userId = post.userid;
    return (
        <span className='PostListItem__author' >
            {getUserNameForPost(userId, users)}
        </span>
    )
}


