import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import DrawerToggleButton from "../sidedrawer/DrawerToggleButton";
import Logo from '../../../src/logo_transparent.png';
import NavBarContext from '../../contexts/NavBarContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt, faSearch } from "@fortawesome/free-solid-svg-icons";

class NavBar extends React.Component {
    static contextType = NavBarContext;

    state = {
        searchKeyword: ""
    };

    render() {
        const { userid } = this.context;

        return (
            <header className="toolbar">
                <nav className="toolbar__navigation">
                    <div className="toolbar__logo">
                        <Link to="/">
                            <img src={Logo} alt="logo" />
                        </Link>
                    </div>
                    <div className="spacer">
                        <div className="spacer">
                            <input
                                placeholder="search users"
                                className="search-input"
                                required
                                type="text"
                                name="keyword"
                                id="search-keyword"
                                onChange={e => this.setState({ searchKeyword: e.target.value })}
                            />
                            <span className="search-icon">
                                <FontAwesomeIcon icon={faSearch} />
                            </span>
                        </div>
                    </div>

                    <div className="toolbar_navigation_items">
                        <ul>
                            {this.context.loggedIn ? (
                                <>
                                    <li>
                                        <Link to="/messages">
                                            <FontAwesomeIcon icon={faCommentAlt} />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/posts">Posts</Link>
                                    </li>
                                    <li>
                                        <Link to="/users">
                                            <span className='NavBar__users fas fa-users'>
                                                <FontAwesomeIcon size='2x' icon='users' />
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/connections">Connections</Link>
                                    </li>
                                    <li
                                        onClick={() => {
                                            this.context.handleProfileLink();
                                        }}
                                    >
                                        {" "}
                                        <Link to={`/users/${userid}`}>
                                            {this.context.userName || "Profile"}
                                        </Link>
                                    </li>
                                    <li onClick={this.context.handleSignOut}>
                                        {" "}
                                        <Link to="/">Sign out</Link>
                                    </li>
                                </>
                            ) : (
                                    <li>
                                        <Link to="/signup">Sign In</Link>
                                    </li>
                                )}
                        </ul>
                    </div>
                    <div className="toolbar__toggle-button">
                        <DrawerToggleButton click={this.props.drawerClickHandler} />
                    </div>
                </nav>
            </header >
        );
    }
}

export default NavBar;
