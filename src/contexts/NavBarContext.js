import React from "react";

export const nullPost = {
  user: {},
  tags: []
};

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
    users: [],
    setUsers: () => { },
    postList: [],
    posts: [],
    comments: [],
    commentsList: [],
    error: null,
    setError: () => { },
    clearError: () => { },
    setPostList: () => { },
    post: '',
    reviews: [],
    setPost: () => { },
    clearPost: () => { },
    setComments: () => { },
    setCommentsList: () => { },
    addComment: () => { },
    addPost: () => { },
    handleClickConnect: () => { },
    allUsers: [],
    allMessages: []
})


export default NavBarContext;
