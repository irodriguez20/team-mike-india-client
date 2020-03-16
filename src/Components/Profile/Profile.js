import React, { Component } from 'react';
import NavBarContext from '../../contexts/NavBarContext';
import PostListItem from '../../Components/PostListItem/PostListItem';
import { getUserPosts } from '../../services/helperFunctions';
import './Profile.css';

export default class UserProfile extends Component {
    static defaultProps = {
        match: { params: {} },
    }
    static contextType = NavBarContext;

    handleClickMessage = e => {
        console.log('clicked message');
    }

    render() {
        const { posts = [], comments = [], userName, userFirstName, userLastName, userid } = this.context;
        return (
            <div className='UserProfile__container'>
                <section className='UserProfile__names'>
                    <h1>{userName}</h1>
                    <h2>{userFirstName} {userLastName}</h2>
                    <button onClick={this.handleClickMessage}>Message</button>
                </section>
                <section className='List__of__user__activity'>
                    <h3>Activity</h3>
                    <GrabUserPosts posts={posts} comments={comments} userid={userid} />
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
