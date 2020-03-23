import React, { Component } from "react";
import NavBarContext from "../../contexts/NavBarContext";
import MessageContext from "./MessageContext";
import { Link } from "react-router-dom";
import "./Messages.css";
import ChatPage from "./ChatPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { format } from "date-fns";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import config from "../../config";

import {
  faUser
} from "@fortawesome/free-solid-svg-icons";

export default class Messages extends Component {
  state = {
    messages: [],
    userConversations: [],
    loggedInUserID: this.context.userid,
    usersInConvos: []
  };

  static contextType = NavBarContext;

  componentDidMount() {
    this.fetchAllMessages();
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
            Number(message.author_id) === this.context.userid ||
            Number(message.recipient_id) === this.context.userid
        );
        const setAllUsers = this.context.allUsers.filter(user =>
          user.id !== this.context.userid
        );

        this.setState({ messages: userConversations, usersInConvos: setAllUsers });
      })
      .catch(err => {
        Swal.fire(err);
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

    fetch(
      `${config.API_ENDPOINT}/api/messages/${messageID}`,
      options
    )
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e));
        }

        this.setState({ messages: this.state.messages.filter(n => n.id !== messageID) });
      })
      .catch(err => {
        Swal.fire(err.error.message);
      });
  };

  render() {
    const value = {
      messages: this.state.messages,
      loggedInUserID: this.context.userid,
      allUsers: this.context.allUsers,
      usersInConvos: this.state.usersInConvos,
      handleAddMessage: this.handleAddMessage,
      handleDeleteMessage: this.handleDeleteMessage
    };

    // const userConversations = this.state.messages;

    return (
      <div className="message-body">
        <div className="message-container">
          <div id="search-container">
            <input type="text" placeholder="Search" />
          </div>
          <div id="conversation-list">
            <ul>
              {this.state.usersInConvos.map((user, index) => (
                <li key={index}>
                  <Link to={`/messages/${user.username}`}>
                    <div className="conversation">
                      <FontAwesomeIcon icon={faUser} />
                      <div className="title-text">{user.username}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div id="new-message-container">
            {/* <a href="#">+</a> */}
          </div>
          <MessageContext.Provider value={value}>
            <ChatPage />
          </MessageContext.Provider>
        </div>
      </div>
    );
  }
}
