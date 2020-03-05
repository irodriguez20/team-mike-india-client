import React, { Component } from 'react'
import PostListContext from '../../contexts/PostListContext'
import PostApiService from '../../services/post-api-service'
import { Section } from '../../Components/Utils/Utils'
import PostListItem from '../../Components/PostListItem/PostListItem'
import './PostListPage.css'

export default class PostListPage extends Component {
    static contextType = PostListContext;

    componentDidMount() {
        this.context.clearError()
        PostApiService.getPosts()
            .then(this.context.setPostList)
            .catch(this.context.setError)
    }

    renderPosts() {
        const { postList = [] } = this.context
        console.log(postList)
        return postList.map(post =>
            <PostListItem
                key={post.id}
                post={post}
            />
        )
    }

    render() {
        const { error } = this.context
        return (
            <div className="PostListPage_Container">
                <Section className="PostListPage_Add_Post">
                    <form className="PostListPage_Add_Post_Form">
                        <label>What's on your mind?</label>
                        <textarea required id="post" className="post" placeholder="Tips and tricks to ace your coding interview..." />
                        <button>Post</button>
                    </form>
                </Section>
                <Section list className='PostListPage'>
                    {error
                        ? <p className='red'>There was an error, try again</p>
                        : this.renderPosts()}
                </Section>
            </div>
        )
    }
}
