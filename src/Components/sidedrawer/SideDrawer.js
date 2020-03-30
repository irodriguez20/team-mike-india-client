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
              <span
                onClick={() => {
                  this.context.backDropClickHandler();
                }}
              >
                <li className="spacer__sideDrawer">
                  <input
                    placeholder="search users"
                    className="search-input"
                    required
                    type="text"
                    name="keyword"
                    id="search-keyword"
                    onChange={e => this.setState({ searchKeyword: e.target.value })}
                  />
                  <span className="search-icon__sideDrawer">
                    <FontAwesomeIcon icon={faSearch} />
                  </span>
                </li>

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
