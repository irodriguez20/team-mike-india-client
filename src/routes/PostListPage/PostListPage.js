import React, { Component } from 'react'
import PostApiService from '../../services/post-api-service'
import { Section } from '../../Components/Utils/Utils'
import PostListItem from '../../Components/PostListItem/PostListItem'
import config from '../../config';
import PropTypes from 'prop-types';
import NavBarContext from '../../contexts/NavBarContext';
import './PostListPage.css'

class PostListPage extends Component {
    static propTypes = {
        history: PropTypes.shape({
            push: () => { }
        }).isRequired,
    };

    static contextType = NavBarContext;


    componentDidMount() {
        this.context.clearError()
        PostApiService.getPosts()
            .then(this.context.setPostList)
            .catch(this.context.setError)
        PostApiService.getUsers()
            .then(this.context.setUsers)
            .catch(this.context.setError)
    }

    renderPosts() {
        const { postList = [], comments = [] } = this.context

        return postList.map(post =>
            <PostListItem
                key={post.id}
                post={post}
                comments={comments}
            />
        )
    }

    handleSubmit = e => {
        e.preventDefault();

        const { postText } = e.target;
        const newPost = {
            post: postText.value,
            userid: this.context.userid,
            // posted: postInfo.posted,
        };

        fetch(`${config.API_ENDPOINT}/api/posts`, {
            method: "POST",
            body: JSON.stringify(newPost),
            headers: {
                "content-type": "application/json",
                "auth": `${config.TOKEN_KEY}`
            },
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(e => Promise.reject(e));
                }
                return res.json()
                // this.renderPosts();
            })
            .then(post => {
                postText.value = "";
                this.context.addPost(post);
                this.props.history.push('/posts');
            })
            .catch(err => {
                console.error({ err });
            });
    };

    render() {
        const { error } = this.context

        return (
            <div className="PostListPage_Container">
                <Section className="PostListPage_Add_Post">
                    <form className="PostListPage_Add_Post_Form" onSubmit={this.handleSubmit}>
                        <label>What's on your mind?</label>
                        <textarea
                            required
                            id="postText"
                            name="postText"
                            cols='30'
                            rows='3'

                        />
                        <div className="Add_Post_button" >
                            <button
                                type="submit"

                            >Post</button>
                        </div>
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

PostListPage.defaultProps = {
    history: PropTypes.Object
};

export default PostListPage;
