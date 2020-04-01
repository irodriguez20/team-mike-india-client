import React, { Component } from "react";
import NavBarContext from "../../contexts/NavBarContext";
import PropTypes from "prop-types";
import Connection from "../../Components/Connection/Connection";

export default class ConnectionsListPage extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: () => {}
    }).isRequired
  };

  static contextType = NavBarContext;

  // const newConnection = {
  //     userid: connectionBody.userid,
  //     followerid: connectionBody.followerid
  //   };

  //   const connectedUser = this.state.allUsers.filter(user => user.id === connectionBody.userid)

  render() {
    const users = this.context.allUserFollowers.filter(
      user => user.followerid !== this.context.userid
    );
    return (
      <div className="UsersListPage_container">
        {users.map(user => (
          <Connection key={user.connectionid} user={user} />
        ))}
      </div>
    );
  }
}
