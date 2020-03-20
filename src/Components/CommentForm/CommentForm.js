import React, { Component } from 'react'
import NavBarContext from '../../contexts/NavBarContext'
import PropTypes from 'prop-types';
import { Button } from '../Utils/Utils'
import config from '../../config'
import './CommentForm.css'
import { Redirect } from 'react-router-dom';

export default class CommentForm extends Component {
    static propTypes = {
        history: PropTypes.shape({
            push: () => { }
        }).isRequired,
    };
    static contextType = NavBarContext

    handleSubmit = ev => {
        ev.preventDefault()
        const postId = this.props.postId;
        const { commentText } = ev.target;
        const newComment = {
            comment: commentText.value,
            userid: this.context.userid,
            postid: postId,
        }

        fetch(`${config.API_ENDPOINT}/api/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth": `${config.TOKEN_KEY}`
            },
            body: JSON.stringify(newComment)
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(e => Promise.reject(e));
                }
                return res.json();
            })
            .then(comment => {
                commentText.value = "";
                this.context.addComment(comment);

            })
            .catch(error => {
                console.log({ error });
            })


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
                        name='commentText'
                        id='commentText'
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
