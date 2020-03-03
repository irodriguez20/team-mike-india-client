import React from "react";
import "./BackDrop.css";
import NavBarContext from '../../contexts/NavBarContext';

class BackDrop extends React.Component {
  static contextType = NavBarContext;

  render() {
    return (
      <div
        className="backdrop"
        onClick={e => this.context.backDropClickHandler()}
      />
    );
  }
}

export default BackDrop;
