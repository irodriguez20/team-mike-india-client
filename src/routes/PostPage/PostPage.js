import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavBarContext, { nullPost } from '../../contexts/NavBarContext'
import PostApiService from '../../services/post-api-service'
import { NiceDate, Hyph, Section } from '../../Components/Utils/Utils'
import StyleIcon from '../../Components/StyleIcon/StyleIcon'
import CommentForm from '../../Components/CommentForm/CommentForm'
import './PostPage.css'
import PostListItem from '../../Components/PostListItem/PostListItem'
import { format } from 'date-fns'

export default class PostPage extends Component {
    static defaultProps = {
        match: { params: {} },
    }

    static contextType = NavBarContext

    render() {
        // const { postList, comments } = this.context
        const id = parseInt(this.props.match.params.postId);
        const post = this.context.posts.find(po => po.id === id);
        console.log(this.context.posts, id, post)

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
                    {/* <h2>{post.title}</h2> */}
                    <p>
                        {/* <PostListItem post={post} /> */}
                        <PostStyle post={post} />
                        {post.userid && <>
                            <Hyph />
                            <PostAuthor post={post} />
                        </>}
                        <Hyph />
                        <PostDate date={post.posted} />
                    </p>
                    <PostContent post={post} />
                    {/* <PostComments comments={comments} /> */}

                </div>
                <CommentForm />
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
    // let date = new Date(post.posted);
    return (
        <span className='PostPage__date'>
            {format(new Date(date), "do MMM YYYY")}
        </span>
    )
}

function PostAuthor({ post }) {
    return (
        <span className='PostPage__author'>
            {post.userid}
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

function PostComments({ comments = [] }) {
    return (
        <ul className='PostPage__comment-list'>
            {comments.map(comment =>
                <li key={comment.id} className='PostPage__comment'>
                    <p className='PostPage__comment-text'>
                        <FontAwesomeIcon
                            size='lg'
                            icon='quote-left'
                            className='PostPage__comment-icon blue'
                        />
                        {comment.comment}
                    </p>
                    <p className='PostPage__comment-user'>
                        {comment.userid}
                    </p>
                </li>
            )}
        </ul>
    )
}
