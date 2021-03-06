// import TokenService from '../services/token-service'
import config from '../config'
// import { tokenService } from './token-service'


const PostApiService = {
    getPosts() {
        return fetch(`${config.API_ENDPOINT}/api/posts`, {
            headers: {
                'authorization': `bearer ${config.TOKEN_KEY}`,
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    getPost(postId) {
        return fetch(`${config.API_ENDPOINT}/api/posts/:${postId}`, {
            headers: {
                'authorization': `bearer ${config.TOKEN_KEY}`,
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    getComments() {
        return fetch(`${config.API_ENDPOINT}/api/comments`, {
            headers: {
                'authorization': `bearer ${config.TOKEN_KEY}`,
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    getComment(commentId) {
        return fetch(`${config.API_ENDPOINT}/api/comments/${commentId}`, {
            headers: {
                'authorization': `bearer ${config.TOKEN_KEY}`,
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    getUsers() {
        return fetch(`${config.API_ENDPOINT}/api/users`, {
            headers: {
                'authorization': `bearer ${config.TOKEN_KEY}`,
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    // postComment(postId, comment) {
    //     return fetch(`${config.API_ENDPOINT}/comments`, {
    //         method: 'POST',
    //         headers: {
    //             'authorization': `bearer ${config.TOKEN_KEY}`,
    //         },
    //         body: JSON.stringify({
    //             post_id: postId,
    //             comment,
    //         }),
    //     })
    //         .then(res =>
    //             (!res.ok)
    //                 ? res.json().then(e => Promise.reject(e))
    //                 : res.json()
    //         )
    // }
}

export default PostApiService
