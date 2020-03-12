import React from 'react';
export const countCommentsForPost = (comments = [], postId) =>
    comments.filter(comment => comment.postid == postId).length

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