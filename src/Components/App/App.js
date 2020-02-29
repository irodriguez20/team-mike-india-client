import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import PostPage from '../../routes/PostPage/PostPage';
import LoginPage from '../../routes/LoginPage/LoginPage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import SignUpPage from '../../routes/SignUpPage/SignUpPage';
import PostListPage from '../../routes/PostListPage/PostListPage';
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
        <main className="App__main">
          {this.state.hasError && <p className="red">There was an error! Please try again.</p>}
          <Switch>
            <Route
              exact
              path={'/'}
              component={PostListPage}
            />
            <PublicOnlyRoute
              path={'/login'}
              component={LoginPage}
            />
            <PublicOnlyRoute
              path={'/signup'}
              component={SignUpPage}
            />
            <PrivateRoute
              path={'/post/:postId'}
              component={PostPage}
            />
            <Route
              component={NotFoundPage}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
