import React, { Component } from "react";
import NavBarContext from "../../contexts/NavBarContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./UsersListItem.css";
import { Link } from "react-router-dom";

export default class UsersListItem extends Component {
  static defaultProps = {
    match: { params: {} }
  };
  static contextType = NavBarContext;


  render() {
    const { user } = this.props;

    return (
      <Link to={`/users/${user.id}`} className="UsersListItem">
        <div className="upper-container">
          <div className="image-container">
            <FontAwesomeIcon size="7x" icon="user-circle" />
            <span className="fas fa-user-circle"></span>
          </div>
        </div>
        <section className="UserProfile__names">
          <h3>
            {user.first_name} {user.last_name}
          </h3>
          <h4>{user.username}</h4>
          <button>Connect</button>{" "}
        </section>
      </Link>
    );
  }
}
