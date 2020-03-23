import React from 'react';
// export const countCommentsForPost = (comments = [], postId) =>
//     comments.filter(comment => comment.postid == postId).length

export const getCommentsForPost = (comments = [], postId) => {

    let result = comments

    if (postId) {
        result = []
        // eslint-disable-next-line
        for (let i = 0; i < comments.length; ++i) {
            // eslint-disable-next-line
            let comment = comments[i]
            // eslint-disable-next-line
            if (comment.postid == postId)
                result.push(comment)
        }
    }
    return result
}

export const getUserNameForPost = (userId, users = []) => {
    let result = users;

    if (userId) {
        result = [];
        for (let i = 0; i < users.length; ++i) {
            let user = users[i];

            if (user.id == userId)
                result.push(user);
        }
    }
    return result.map(user => <span key={userId}>{user.username}</span>)
}

export const getUserPosts = (userid, posts = []) => {
    let usersPosts = posts;

    if (userid) {
        usersPosts = [];
        for (let i = 0; i < posts.length; ++i) {
            let post = posts[i];

            if (post.userid == userid)
                usersPosts.push(post);
        }
    }
    return usersPosts;

}

export const getUserComments = (userid, posts = [], comments = []) => {
    let usersPosts = posts;
    let userComments = comments

    if (userid) {
        userComments = [];
        for (let i = 0; i < comments.length; ++i) {
            let comment = comments[i];

            if (comment.userid == userid)
                userComments.push(comment);
        }
    }
    return userComments;

}

export const findUser = (users = [], userid) => {
    let result = users

    if (userid) {
        result = []
        //eslint - disable - next - line
        for (var i = 0; i < users.length; ++i) {
            // eslint-disable-next-line
            let user = users[i]
            // eslint-disable-next-line
            if (user.id == userid)
                result.push(user)
        }
    }

    return result[0]
}