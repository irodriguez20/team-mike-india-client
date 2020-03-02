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
import SideDrawer from '../../Components/sidedrawer/SideDrawer';
import BackDrop from '../../Components/backdrop/BackDrop';
import NavBarContext from '../../contexts/NavBarContext';
import './App.css';

class App extends Component {
  state = {
    hasError: false,
    loggedIn: false,
    userId: "",
    userEmail: "",
    userName: tokenService.userName,
    userFirstName: "",
    userLastName: "",
    token: tokenService.token,
    channels: [],
    channelsSearchResults: [],
    sideDrawerOpen: false,
    searchResults: [],
    // searchLocation: ""
  };

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backDropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  handleSignOut = () => {
    tokenService.remove();
    this.setState({
      loggedIn: false,
      userId: "",
      userLastName: "",
      userFirstName: ""
    });
    // this.fetchTours();
  };

  render() {
    let backDrop;

    if (this.state.sideDrawerOpen) {
      backDrop = <BackDrop />;
    }

    const navBarContextValue = {
      drawerToggleClickHandler: this.drawerToggleClickHandler,
      backDropClickHandler: this.backDropClickHandler,
      userName: this.state.userName,
      userFirstName: this.state.userFirstName,
      userLastName: this.state.userLastName,
      handleSignOut: this.handleSignOut,
    }
    return (
      <div className="App" style={{ height: "100%" }}>
        <NavBarContext.Provider value={navBarContextValue}>
          <header className="App-header">
            <NavBar />
            <SideDrawer show={this.state.sideDrawerOpen} />
            {backDrop}
            <BackDrop />
            <section className="App-name-motto">
              <h1>Welcome To upLift</h1>
              <h2>Where we believe mentorship should be accessible to everyone.</h2>
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
              {/* <Route
              path={'/login'}
              component={LoginPage}
            /> */}
              <Route
                path={'/signup'}
                component={SignUpPage}
              />
              <Route
                path={'/post/:postId'}
                component={PostPage}
              />
              <Route
                component={NotFoundPage}
              />
            </Switch>
          </main>
        </NavBarContext.Provider>
      </div>
    );
  }
}

export default App;
