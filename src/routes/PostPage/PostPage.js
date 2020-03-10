import React, { Component } from 'react'
import NavBarContext from '../../contexts/NavBarContext'
import { Hyph } from '../../Components/Utils/Utils'
import StyleIcon from '../../Components/StyleIcon/StyleIcon'
import CommentForm from '../../Components/CommentForm/CommentForm'
import './PostPage.css'
import { format } from 'date-fns'
import Comments from '../../Components/Comments/Comments'

export default class PostPage extends Component {
    static defaultProps = {
        match: { params: {} },
    }

    static contextType = NavBarContext

    render() {
        // const { postList, comments } = this.context
        const id = parseInt(this.props.match.params.postId);
        const post = this.context.posts.find(po => po.id === id);
        const comments = this.context.comments;
        console.log(comments)

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
                </div>
                <CommentForm />
                <Comments postId={post.id} />

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


