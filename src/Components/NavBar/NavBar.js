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
        searchKeyword: "",
    };


    handleChange = e => {
        e.preventDefault();
        // Variable to hold the original version of the list
        let currentList = [];
        // Variable to hold the filtered list before putting into state
        let newList = [];

        // If the search bar isn't empty
        if (e.target.value !== "") {
            // Assign the original list to currentList
            currentList = this.context.users;
            // Use .filter() to determine which items should be displayed
            // based on the search terms
            newList = currentList.filter(user => {
                // change current item to lowercase
                const lc = user.username.toLowerCase();
                // change search term to lowercase
                const filter = e.target.value.toLowerCase();
                // check to see if the current list item includes the search term
                // If it does, it will be added to newList. Using lowercase eliminates
                // issues with capitalization in search terms and search content
                return lc.includes(filter);
            });
        } else {
            // If the search bar is empty, set newList to original task list
            newList = this.context.users;
        }
        // Set the filtered state based on what our rules added to newList
        this.context.searchUsersResults = newList;
    }



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
                        <div className="spacer" onChange={this.handleChange}>
                            <input
                                placeholder="search users"
                                className="search-input"
                                required
                                type="text"
                                name="keyword"
                                id="search-keyword"
                            />
                            <Link className="search-icon" to={'/users'}>
                                <FontAwesomeIcon icon={faSearch} />
                            </Link>
                        </div>
                    </div>

                    <div className="toolbar_navigation_items">
                        <ul>
                            {this.context.loggedIn ? (
                                <>
                                    <li>
                                        <Link to="/messages">
                                            <FontAwesomeIcon icon={faCommentAlt} />
                                            {" "}
                                            Messages
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/posts">Posts</Link>
                                    </li>
                                    <li>
                                        <Link to="/connections">
                                            <span className='NavBar__users fas fa-users'>
                                                <FontAwesomeIcon size='2x' icon='users' />
                                            </span>
                                        </Link>
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
