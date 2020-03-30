import React from 'react';
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './ChatHome.css';


class ChatHome extends React.Component {
  render() {
    return (<>
      <main className="chatHome">
        <section> <h3>Click on user to start a chat!!!</h3></section>
        <section>
          <span className="comment-icon" >
            <FontAwesomeIcon size='8x' icon={faCommentAlt} />
          </span>
        </section>
      </main>
    </>)
  }
}

export default ChatHome;