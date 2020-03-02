import React from "react";
import "./DrawerToggleButton.css";
import NavBarContext from '../../contexts/NavBarContext';

// const DrawerToggleButton = props => (
//   <button className="toggle-button">
//     <div className="toggle-button__line"></div>
//     <div className="toggle-button__line"></div>
//     <div className="toggle-button__line"></div>
//   </button>
// );

class DrawerToggleButton extends React.Component {
  static contextType = NavBarContext;

  render() {
    return (
      <button
        className="toggle-button"
        onClick={e => this.context.drawerToggleClickHandler()}
      >
        <div className="toggle-button__line"></div>
        <div className="toggle-button__line"></div>
        <div className="toggle-button__line"></div>
      </button>
    );
  }
}

export default DrawerToggleButton;
