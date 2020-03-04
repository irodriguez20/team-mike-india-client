import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import DrawerToggleButton from "../sidedrawer/DrawerToggleButton";
import Logo from '../../../src/logo_transparent.png';
import NavBarContext from '../../contexts/NavBarContext';


class NavBar extends React.Component {
    static contextType = NavBarContext;

    linkToProfile = `/users/${this.context.username}`;

    render() {
        return (
            <header className="toolbar">
                <nav className="toolbar__navigation">
                    <div className="toolbar__logo">
                        <Link to="/landing">
                            <img src={Logo} alt="logo" />
                        </Link>
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
                                        <Link to="/login">Sign In</Link>
                                    </li>
                                )}
                        </ul>
                    </div>
                    <div className="toolbar__toggle-button">
                        <DrawerToggleButton click={this.props.drawerClickHandler} />
                    </div>
                </nav>
            </header>
        );
    }
}

export default NavBar;