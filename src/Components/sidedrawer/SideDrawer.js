import React from "react";
import { Link } from "react-router-dom";
import "./SideDrawer.css";
import NavBarContext from '../../contexts/NavBarContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SideDrawer extends React.Component {
  static contextType = NavBarContext;

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
              <li
                onClick={() => {
                  this.context.backDropClickHandler();
                }}
              >
                <Link to="/posts">Posts</Link>
              </li>
              <li
                onClick={() => {
                  this.context.backDropClickHandler();
                }}
              >
                <Link to="/channels">Channels</Link>
              </li>
              <li>
                <Link to="/users">
                  <span className='NavBar__users fas fa-users'>
                    <FontAwesomeIcon size='2x' icon='users' />
                  </span>
                  {" "}
                    Users
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
                <Link to="/login">Log in</Link>
              </li>
            )}
        </ul>
      </nav>
    );
  }
}

export default SideDrawer;
