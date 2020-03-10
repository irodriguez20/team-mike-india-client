export const countCommentsForPost = (comments = [], postId, ) =>
    comments.filter(comment => parseInt(comment.postid) === parseInt(postId)).length

export const getCommentsForPost = (comments = [], postId) => {

    let result = comments

    if (postId) {
        result = []
        // eslint-disable-next-line
        for (var i = 0; i < comments.length; ++i) {
            // eslint-disable-next-line
            let comment = comments[i]
            // eslint-disable-next-line
            if (parseInt(comment.postid) === parseInt(postId))
                result.push(comment)
        }
    }
    return result
}