import React, { Component } from "react";
import NavBarContext from "../../contexts/NavBarContext";
import PostListItem from "../../Components/PostListItem/PostListItem";
import { Link } from "react-router-dom";

import {
  getUserPosts,
  getUserComments,
} from "../../services/helperFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./UserListMainPage.css";
import Comments from "../../Components/Comments/Comments";

export default class UserListMainPage extends Component {
  static defaultProps = {
    match: { params: {} }
  };
  static contextType = NavBarContext;


  render() {
    const { posts = [], comments = [], allUsers = [] } = this.context;

    const connectionBody = {
      userid: Number(this.props.match.params.userId),
      followerid: this.context.userid
    }


    const user = allUsers.filter(
      user => user.id === parseInt(this.props.match.params.userId)
    );

    const connectAndMessageButtons =
      parseInt(this.props.match.params.userId) !== this.context.userid ? (
        <>
          {" "}
          <Link to={`/messages/${user[0].username}`}>
            <button>Message</button>
          </Link>
          <button onClick={(e) => {
            e.preventDefault()
            this.context.handleClickConnect(connectionBody)
          }}>Connect</button>
        </>
      ) : null;

    return (
      <div className="UserProfile__container">
        <div className="upper-container">
          <div className="image-container">
            <FontAwesomeIcon size="7x" icon="user-circle" />
            <span className="fas fa-user-circle"></span>
          </div>
        </div>
        <section className="UserProfile__names">
          <h3>
            {user[0].first_name} {user[0].last_name}
          </h3>
          <h4>{user[0].username}</h4>
          {connectAndMessageButtons}
        </section>
        <section className="List__of__user__activity">
          <h3>Activity</h3>
          <GrabUserPosts posts={posts} comments={comments} userid={user[0].id} />
          <GrabUserComments
            posts={posts}
            comments={comments}
            userid={user[0].id}
          />
        </section>
      </div>
    );
  }
}

function GrabUserPosts({ posts, userid, comments }) {
  let userPosts = getUserPosts(userid, posts);
  return userPosts.map(post => (
    <PostListItem
      key={post.id}
      post={post}
      comments={comments}
      userid={userid}
    />
  ));
}

function GrabUserComments({ posts, userid, comments }) {
  let userComments = getUserComments(userid, comments);
  return userComments.map(comment => (
    <Comments
      key={comment.id}
      post={comment.postid}
      comment={comment}
      userid={userid}
    />
  ));
}
