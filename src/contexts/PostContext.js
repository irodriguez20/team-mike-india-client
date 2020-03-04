import React, { Component } from 'react'

export const nullPost = {
    user: {},
    tags: [],
}

const PostContext = React.createContext({
    post: nullPost,
    reviews: [],
    error: null,
    setError: () => { },
    clearError: () => { },
    setPost: () => { },
    clearPost: () => { },
    setComments: () => { },
    addComment: () => { },
})

export default PostContext

export class PostProvider extends Component {
    state = {
        post: nullPost,
        error: null,
    };

    setError = error => {
        console.error(error)
        this.setState({ error })
    }

    clearError = () => {
        this.setState({ error: null })
    }

    setPost = post => {
        this.setState({ post })
    }

    setComments = comments => {
        this.setState({ comments })
    }

    clearPost = () => {
        this.setPost(nullPost)
        this.setComments([])
    }

    addComment = comment => {
        this.setComments([
            ...this.state.comments,
            comment
        ])
    }

    render() {
        const value = {
            post: this.state.post,
            comments: this.state.comments,
            error: this.state.error,
            setError: this.setError,
            clearError: this.clearError,
            setPost: this.setPost,
            setComments: this.setComments,
            clearPost: this.clearPost,
            addComment: this.addComment,
        }
        return (
            <PostContext.Provider value={value}>
                {this.props.children}
            </PostContext.Provider>
        )
    }
}
