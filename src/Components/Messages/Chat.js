import React from "react";
import { faTrashAlt, faInbox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MessageContext from "./MessageContext";
import { format } from "date-fns";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import "./Chat.css";

class Chat extends React.Component {
  static contextType = MessageContext;
  state = {
    message_body: "",
    recipient_id_username: this.props.match.params.username,
    author_id: this.context.loggedInUserID
  };

  render() {
    const userInChat = this.context.allUsers.filter(
      user => this.props.match.params.username === user.username
    );
    const userChat = this.context.messages.filter(
      message =>
        Number(message.author_id) === userInChat[0].id ||
        Number(message.recipient_id) === userInChat[0].id
    );

    const chatList = userChat.map((chat, index) => {
      return (
        <li key={index}>
          <div className="chat-messages-new">
            <div
              className={
                this.context.loggedInUserID === Number(chat.author_id)
                  ? "your-message message"
                  : "other-message message"
              }
            >
              <FontAwesomeIcon icon={faTrashAlt} onClick={event => {
                event.preventDefault();
                if (Number(chat.id).length === 0) {
                  Swal.fire("There was an error delering this message");
                }
                this.context.handleDeleteMessage(Number(chat.id));
              }} />

              <p className="chat-text-body">
                {chat.message_body}
                <span></span>
              </p>
              <p className="chat-text-date">
                {format(new Date(chat.created_at), "DD-MM h:mm")}
              </p>
            </div>
          </div>
        </li>
      );
    });

    const messageBody = {
      message_body: this.state.message_body,
      recipient_username: this.props.match.params.username,
      author_id: this.context.loggedInUserID
    };

    return (
      <>
        <div id="chat-title">
          <span className="chat-title-username">{`${userInChat[0].first_name}  ${userInChat[0].last_name}`}</span>
          <FontAwesomeIcon icon={faInbox} />
        </div>
        <div id="chat-message-list">
          <ul>{chatList}</ul>
        </div>
        <div id="chat-form">
          <input
            name="message-body"
            placeholder="Type a message"
            onChange={e => this.setState({ message_body: e.target.value })}
            onKeyPress={e =>
              e.key === "Enter"
                ? this.context.handleAddMessage(messageBody)
                : null
            }
          />
          <div className="send-image">
            <FontAwesomeIcon size='1x' icon='paper-plane' onClick={event => {
              event.preventDefault();
              if (this.state.message_body.length === 0) {
                Swal.fire("You cannot send an empty message");
              }
              this.context.handleAddMessage(messageBody);
              this.setState({ message_body: "" });
            }} />
            <span className="fas fa-paper-plane" ></span>
          </div>
        </div>
      </>
    );
  }
}

export default Chat;
