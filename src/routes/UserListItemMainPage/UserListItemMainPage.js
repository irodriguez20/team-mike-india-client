import React, { Component } from 'react';
import NavBarContext from '../../contexts/NavBarContext';
import PostListItem from '../../Components/PostListItem/PostListItem';
import { getUserPosts, getUserComments, findUser } from '../../services/helperFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './UserListMainPage.css';
import Comments from '../../Components/Comments/Comments';

export default class UserListMainPage extends Component {
    static defaultProps = {
        match: { params: {} }
    }
    static contextType = NavBarContext;

    handleClickMessage = e => {
        console.log('clicked message');
    }

    handleClickConnect = e => {
        console.log('clicked connect');
    }

    render() {
        const { posts = [], comments = [], users = [] } = this.context;
        const { userId } = this.props.match.params

        const user = findUser(users, userId) || { content: '' }

        return (
            <div className='UserProfile__container'>
                <div className="upper-container">
                    <div className="image-container">
                        <FontAwesomeIcon size='7x' icon='user-circle' />
                        <span className='fas fa-user-circle'></span>
                    </div>
                </div>
                <section className='UserProfile__names'>
                    <h3>{user.first_name} {user.last_name}</h3>
                    <h4>{user.username}</h4>
                    <button onClick={this.handleClickMessage}>Message</button>
                    <button onClick={this.handleClickConnect}>Connect</button>
                </section>
                <section className='List__of__user__activity'>
                    <h3>Activity</h3>
                    <GrabUserPosts posts={posts} comments={comments} userid={user.id} />
                    <GrabUserComments posts={posts} comments={comments} userid={user.id} />
                </section>
            </div>
        )
    }
}

function GrabUserPosts({ posts, userid, comments }) {
    let userPosts = getUserPosts(userid, posts)
    return userPosts.map(post =>
        <PostListItem
            key={post.id}
            post={post}
            comments={comments}
            userid={userid}
        />
    )
}

function GrabUserComments({ posts, userid, comments }) {
    let userComments = getUserComments(userid, comments)
    return userComments.map(comment =>
        <Comments
            key={comment.id}
            post={comment.postid}
            comment={comment}
            userid={userid}
        />
    )
}


