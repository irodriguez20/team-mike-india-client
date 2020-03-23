import React, { Component } from 'react'
import NavBarContext from '../../contexts/NavBarContext'
import { Hyph } from '../../Components/Utils/Utils'
import StyleIcon from '../../Components/StyleIcon/StyleIcon'
import CommentForm from '../../Components/CommentForm/CommentForm'
import './PostPage.css'
import { format } from 'date-fns'
import { getUserNameForPost } from '../../services/helperFunctions'
import Comments from '../../Components/Comments/Comments'

export default class PostPage extends Component {
    static defaultProps = {
        match: { params: {} },
    }

    static contextType = NavBarContext;

    render() {
        const id = parseInt(this.props.match.params.postId);
        const post = this.context.posts.find(po => po.id === id);
        const { users = [] } = this.context


        if (!post) {
            return (
                <div>
                    <h1>Error 404</h1>
                </div>
            );
        }

        return (
            <>
                <div className="PostPage__main">
                    <p>
                        <PostStyle post={post} />
                        {post.userid && <>
                            <Hyph />
                            <PostAuthor post={post} users={users} />
                        </>}
                        <Hyph />
                        <PostDate date={post.posted} />
                    </p>
                    <PostContent post={post} />
                </div>
                <CommentForm postId={post.id} />
                <Comments postId={post.id} users={users} />

            </>)
    }
}

function PostStyle({ post }) {
    return (
        <span className='PostPage__style'>
            <StyleIcon style={post.style} />
            {' '}
            {post.style}
        </span>
    )
}

function PostDate({ date }) {
    return (
        <span className='PostPage__date'>
            {format(new Date(date), "do MMM YYYY")}
        </span>
    )
}

function PostAuthor({ post, users }) {
    let userId = post.userid;
    return (
        <span className='PostPage__author'>
            {getUserNameForPost(userId, users)}
        </span>
    )
}

function PostContent({ post }) {

    return (
        <p className='PostPage__content'>
            {post.post}
        </p>
    )
}


