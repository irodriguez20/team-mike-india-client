import React from "react";
import "./DrawerToggleButton.css";
import NavBarContext from '../../contexts/NavBarContext';


class DrawerToggleButton extends React.Component {
  static contextType = NavBarContext;

  render() {
    return (
      <button
        className="toggle-button"
        onClick={this.props.click}
      >
        <div className="toggle-button__line"></div>
        <div className="toggle-button__line"></div>
        <div className="toggle-button__line"></div>
      </button>
    );
  }
}

export default DrawerToggleButton;
