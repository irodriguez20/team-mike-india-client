import React from "react";
import { Link } from "react-router-dom";
import "./SideDrawer.css";
import NavBarContext from '../../contexts/NavBarContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt, faSearch } from "@fortawesome/free-solid-svg-icons";

class SideDrawer extends React.Component {
  static contextType = NavBarContext;

  state = {
    searchKeyword: ""
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
    let drawerClasses = "side-drawer";
    if (this.props.show) {
      drawerClasses = "side-drawer open";
    }
    const { userid } = this.context;

    return (
      <nav className={drawerClasses}>
        <ul>
          {this.context.loggedIn ? (
            <>
              <li onChange={this.handleChange}>
                <input
                  placeholder="search users"
                  className="search-input"
                  required
                  type="text"
                  name="keyword"
                  id="search-keyword"
                  onChange={e => this.setState({ searchKeyword: e.target.value })}
                />
                <Link className="search-icon__sideDrawer" to={'/users'}>
                  <FontAwesomeIcon icon={faSearch} />
                </Link>
              </li>
              <span
                onClick={() => {
                  this.context.backDropClickHandler();
                }}
              >
                <Link to="/posts">Posts</Link>
              </span>
              <li
                onClick={() => {
                  this.context.backDropClickHandler();
                }}
              >
                <Link to="/messages">
                  <FontAwesomeIcon icon={faCommentAlt} />
                  {' '}
                Messages</Link>
              </li>
              <li
                onClick={() => {
                  this.context.backDropClickHandler();
                }}
              >
                <Link to="/connections">
                  <span className='NavBar__users fas fa-users'>
                    <FontAwesomeIcon size='2x' icon='users' />
                  </span>
                  {" "}
                    Connections
                </Link>
              </li>
              <li
                onClick={() => {
                  this.context.backDropClickHandler();
                  this.context.handleProfileLink();
                }}
              >
                {" "}
                <Link to={`/users/${userid}`}>
                  {this.context.userName || "Profile"}
                </Link>
              </li>
              <li
                onClick={() => {
                  this.context.handleSignOut();
                  this.context.backDropClickHandler();
                }}
              >
                {" "}
                <Link to="/">Sign out</Link>
              </li>
            </>
          ) : (
              <li
                onClick={() => {
                  this.context.backDropClickHandler();
                }}
              >
                <Link to="/signup">Log in</Link>
              </li>
            )}
        </ul>
      </nav>
    );
  }
}

export default SideDrawer;
