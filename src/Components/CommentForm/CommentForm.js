import React, { Component } from "react";
import NavBarContext from "../../contexts/NavBarContext";
import { Button } from "../Utils/Utils";
import config from "../../config";
import "./CommentForm.css";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export default class CommentForm extends Component {
  static contextType = NavBarContext;

  handleSubmit = ev => {
    ev.preventDefault();
    const postId = this.props.postId;
    const { commentText } = ev.target;
    const newComment = {
      comment: commentText.value,
      userid: this.context.userid,
      postid: postId
    };

    fetch(`${config.API_ENDPOINT}/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `${config.TOKEN_KEY}`
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
        Swal.fire(
          `There was an error posting your comment: ${error.error.message}`
        );
      });
  };

  render() {
    return (
      <form className="CommentForm" onSubmit={this.handleSubmit}>
        <div className="text">
          <textarea
            required
            aria-label="Type a comment..."
            name="commentText"
            id="commentText"
            cols="30"
            rows="3"
            placeholder="Type a comment.."
          ></textarea>
        </div>
        <Button className="CommentForm__button" type="submit">
          Post comment
        </Button>
      </form>
    );
  }
}
