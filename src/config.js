
// export default {
//     API_ENDPOINT: 'http://localhost:8000/api',
//     TOKEN_KEY: 'upLift-client-auth-token',
// }

const STORE = {
    users: [
        {
            id: 1,
            first_name: 'India',
            last_name: 'Rowdy',
            username: 'testUserName',
            password: 'testPassword',
        },
        {
            id: 2,
            first_name: 'Mike',
            last_name: 'Labowsky',
            username: 'testUserName2',
            password: 'testPassword2',
        },
        {
            id: 3,
            first_name: 'Jenni',
            last_name: 'fromTheBlock',
            username: 'testUserName3',
            password: 'testPassword3',
        },
    ],
    posts: [
        {
            id: 4,
            userId: 1,
            post: 'some content from post 4',
            posted: new Date(),
            commentsTotal: 1,

        },
        {
            id: 5,
            userId: 2,
            post: 'some content from post 5',
            posted: new Date(),
            commentsTotal: 1,
        },
        {
            id: 6,
            userId: 3,
            post: 'some content from post 6',
            posted: new Date(),
            commentsTotal: 1,
        },
    ],
    comments: [
        {
            id: 7,
            userId: 1,
            text: 'some text comment 7',
            posted: new Date(),
            postId: 4,
        },
        {
            id: 7,
            userId: 1,
            text: 'some text comment 7',
            posted: new Date(),
            postId: 5,
        },
        {
            id: 7,
            userId: 1,
            text: 'some text comment 7',
            posted: new Date(),
            postId: 6,
        },
    ]

}

export default STORE;
