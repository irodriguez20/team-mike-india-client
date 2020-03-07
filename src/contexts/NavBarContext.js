import React from 'react';

export const nullPost = {
    user: {},
    tags: [],
}

const NavBarContext = React.createContext({
    drawerToggleClickHandler: () => { },
    backDropClickHandler: () => { },
    handleSignOut: () => { },
    handleProfileLink: () => { },
    logIn: () => { },
    signUp: () => { },
    userName: "",
    loggedIn: "",
    userFirstName: "",
    userLastName: "",
    userid: '',
    postList: [],
    posts: [],
    error: null,
    setError: () => { },
    clearError: () => { },
    setPostList: () => { },
    post: '',
    reviews: [],
    setPost: () => { },
    clearPost: () => { },
    setComments: () => { },
    addComment: () => { },
})

export default NavBarContext;