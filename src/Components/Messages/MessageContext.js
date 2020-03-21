import React from "react";

const MessageContext = React.createContext({
 messages: [],
 loggedInUser: "",
 handleAddMessage: () => {},
 handleDeleteMessage: () => {},
 allUsers: [],
 usersInConvos: []
});

export default MessageContext;
