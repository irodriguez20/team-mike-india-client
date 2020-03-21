import React from 'react'
import {
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Route } from "react-router-dom";
import ChatHome from "./ChatHome";
import Chat from "./Chat";




class ChatPage extends React.Component {
  render() {
    return (<>
    <Route
      exact
      // path="/"
      path={["/messages"]}
      component={ChatHome} />
    <Route
      exact
      // path="/"
      path={["/messages/:username"]}
      component={Chat} 
      // render = {(props) => { <Chat {...props} loggedInUser={loggedInUser}/>}}
      />

    </>)
  }
}

export default ChatPage;