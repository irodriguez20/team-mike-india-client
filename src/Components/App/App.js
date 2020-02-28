import React, { Component } from 'react';
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
          <h1>Name TBD</h1>
          <h2>Each one Teach One</h2>
        </header>
      </div>
    );
  }
}

export default App;
