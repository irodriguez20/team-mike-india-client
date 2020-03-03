import React from 'react';

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
})

export default NavBarContext;