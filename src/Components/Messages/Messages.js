import React, { Component } from "react";
import NavBarContext from "../../contexts/NavBarContext";
import MessageContext from "./MessageContext";
import { NavLink } from "react-router-dom";
import "./Messages.css";
import ChatPage from "./ChatPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { format } from "date-fns";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import config from "../../config";
import { tokenService } from "../../services/token-service";

import { faUser } from "@fortawesome/free-solid-svg-icons";

export default class Messages extends Component {
  state = {
    messages: [],
    userConversations: [],
    filtered: [],
    loggedInUserID: tokenService.userID,
    usersInConvos: [],
    userInChat: {}
  };

  static contextType = NavBarContext;

  componentDidMount() {
    this.fetchAllMessages();
    this.fetchAllUsers();
  }

  fetchAllMessages = () => {
    const options = {
      method: "Get",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    };

    fetch(`${config.API_ENDPOINT}/api/messages`, options)
      .then(res => res.json())
      .then(responseMessages => {
        const userConversations = responseMessages.filter(
          message =>
            message.author_id === this.state.loggedInUserID ||
            message.recipient_id === this.state.loggedInUserID
        );
        this.setState({
          messages: userConversations
        });
      })
      .catch(err => {
        Swal.fire(err);
      });
  };

  fetchAllUsers = () => {
    const options = {
      method: "Get",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    };
    fetch(`${config.API_ENDPOINT}/api/users`, options)
      .then(res => res.json())
      .then(res => {
        const setAllUsers = res.filter(
          user => user.id !== Number(this.state.loggedInUserID)
        );
        this.setState({ usersInConvos: setAllUsers });
      })
      .catch(err => {
        Swal.fire(err.error.message);
      });
  };

  handleAddMessage = messageBody => {
    const recipient = this.context.allUsers.filter(
      user => user.username === messageBody.recipient_username
    );

    const newMessage = {
      message_body: messageBody.message_body,
      recipient_id: recipient[0].id,
      author_id: messageBody.author_id
    };

    // Post message
    fetch(`${config.API_ENDPOINT}/api/messages`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(newMessage)
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e));
        }

        this.fetchAllMessages();
      })

      .catch(err => {
        Swal.fire(err.error.message);
      });
  };

  handleDeleteMessage = messageID => {
    const options = {
      method: "Delete",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    };

    fetch(`${config.API_ENDPOINT}/api/messages/${messageID}`, options)
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e));
        }

        this.setState({
          messages: this.state.messages.filter(n => n.id !== messageID)
        });
      })
      .catch(err => {
        Swal.fire(err.error.message);
      });
  };

  handleChange = e => {
    // e.preventDefault();
    // Variable to hold the original version of the list
    let currentList = [];
    // Variable to hold the filtered list before putting into state
    let newList = [];

    // If the search bar isn't empty
    if (e.target.value !== "") {
      // Assign the original list to currentList
      currentList = this.state.usersInConvos;
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
      newList = this.state.usersInConvos;
    }
    // Set the filtered state based on what our rules added to newList
    this.setState({ usersInConvos: newList });
  };

  render() {
    const value = {
      messages: this.state.messages,
      loggedInUserID: this.state.loggedInUserID,
      allUsers: this.state.usersInConvos,
      usersInConvos: this.state.usersInConvos,
      handleAddMessage: this.handleAddMessage,
      handleDeleteMessage: this.handleDeleteMessage,
      userInChat: this.state.userInChat
    };

    // const userConversations = this.state.messages;

    return (
      <div className="message-body">
        <div className="message-container">
          <div id="search-container" onChange={this.handleChange}>
            <input
              placeholder="search users"
              className="search-input"
              required
              type="text"
              name="keyword"
              id="search-keyword"
            />
          </div>
          <div id="conversation-list">
            <ul>
              {this.state.usersInConvos.map((user, index) => (
                <li
                  key={index}
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ userInChat: user });
                  }}
                >
                  <NavLink
                    to={`/messages/${user.username}`}
                    className="conversation-link"
                  >
                    <div className="conversation">
                      <FontAwesomeIcon icon={faUser} />
                      <div className="title-text">{user.username}</div>
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div id="new-message-container">{/* <a href="#">+</a> */}</div>
          <MessageContext.Provider value={value}>
            <ChatPage />
          </MessageContext.Provider>
        </div>
      </div>
    );
  }
}
