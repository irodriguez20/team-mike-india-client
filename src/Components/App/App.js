import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicRoute from '../Utils/PublicOnlyRoute';
import './App.css';

class App extends Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <NavBar />
          <section className="App-name-motto">
            <h1>upLift</h1>
            <h2>Each one Teach One</h2>
          </section>
        </header>
      </div>
    );
  }
}

export default App;
