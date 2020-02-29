import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";


class NavBar extends React.Component {
    //   static contextType = ;

    linkToProfile = `/users/${this.context.username}`;

    render() {
        return (
            <header className="toolbar">
                <nav className="toolbar__navigation">
                    <div className="toolbar__logo">
                        {/* <Link to="/">
              <img src="" alt="logo" />
            </Link> */}
                    </div>
                    <div className="spacer" />
                    <div className="toolbar_navigation_items">
                        <ul>
                            {this.context.loggedIn ? (
                                <>
                                    <li>
                                        <Link to="/home">Home</Link>
                                    </li>
                                    <li>
                                        <Link to="/channels">Channels</Link>
                                    </li>

                                    <li onClick={this.context.handleProfileLink}>
                                        {" "}
                                        <Link to={this.linkToProfile}>
                                            {this.context.username || "Profile"}
                                        </Link>
                                    </li>
                                    <li onClick={this.context.handleSignOut}>
                                        {" "}
                                        <Link to="/">Sign out</Link>
                                    </li>
                                </>
                            ) : (
                                    <li>
                                        <Link to="/signup">Sign Up</Link>
                                    </li>
                                )}
                        </ul>
                    </div>
                    {/* <div className="toolbar__toggle-button">
            <DrawerToggleButton click={this.props.drawerClickHandler} />
          </div> */}
                </nav>
            </header>
        );
    }
}

export default NavBar;