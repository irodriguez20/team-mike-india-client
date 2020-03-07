import React, { Component } from 'react'
import NavBarContext from '../../contexts/NavBarContext'
import PostApiService from '../../services/post-api-service'
import { Button, Textarea } from '../Utils/Utils'
import './CommentForm.css'

export default class CommentForm extends Component {
    static contextType = NavBarContext

    handleSubmit = ev => {
        ev.preventDefault()
        const { post } = this.context
        const { text } = ev.target
        PostApiService.postComment(post.id, text.value)
            .then(this.context.addComment)
            .then(() => {
                text.value = ''
            })
            .catch(this.context.setError)
    }

    render() {
        return (
            <form
                className='CommentForm'
                onSubmit={this.handleSubmit}
            >
                <div className='text'>
                    <textarea
                        required
                        aria-label='Type a comment...'
                        name='text'
                        id='text'
                        cols='30'
                        rows='3'
                        placeholder='Type a comment..'>
                    </textarea>
                </div>
                <Button className='CommentForm__button' type='submit'>
                    Post comment
        </Button>
            </form>
        )
    }
}
