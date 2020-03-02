import React from 'react';

const NavBarContext = React.createContext({
    drawerToggleClickHandler: () => { },
    backDropClickHandler: () => { },
    handleSignOut: () => { },
    handleProfileLink: () => { },
})

export default NavBarContext;