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
import NavBarContext, { nullPost } from '../../contexts/NavBarContext';
import { tokenService } from '../../services/token-service';
import './App.css';
import LandingPage from '../LandingPage/LandingPage';
import MainPage from '../MainPage/MainPage'
import AuthApiService from '../../services/auth-api-service';
import config from '../../config';

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
    post: nullPost,
    posts: [],
    postList: [],
    error: null,
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

  componentDidMount() {
    if (this.state.token !== null && this.state.userName !== null) {
      const loggedInUser = {
        userName: this.state.userName
      };

      fetch(`${config.API_ENDPOINT}/api/auth/`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(loggedInUser)
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          console.log(res);
          this.setState({
            loggedIn: true,
            userId: res.id,
            userLastName: res.lastName,
            userFirstName: res.firstName,
            userName: res.userName,
            userEmail: res.useremail
          });
          this.fetchPosts();
        })
        .catch(err => {
          console.error({ err });
        });
    } else {
      this.fetchPosts();
    }
  }

  signUp = userInfo => {
    const newUser = {
      username: userInfo.userName,
      f_name: userInfo.f_name,
      l_name: userInfo.l_name,
      email: userInfo.email,
      password: userInfo.password
    };

    this.logIn(newUser);
    fetch(`${config.API_ENDPOINT}/api/users`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        "auth": `${config.TOKEN_KEY}`
      }),
      body: JSON.stringify(newUser)
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        const user = {
          user_name: res.username,
          email: res.email,
          password: res.password
        };
        this.logIn(user);
        this.fetchPosts();
      })
      .catch(error => {
        console.error({ error })
      })
  };

  logIn = userInfo => {
    const user = {
      username: userInfo.user_name,
      email: userInfo.email,
      password: userInfo.password
    };

    this.setState({
      userId: user.id,
      userName: user.username,
      userEmail: user.email,
      loggedIn: true
    });
    AuthApiService.postLogin(user);
    fetch(`${config.API_ENDPOINT}/api/auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${config.TOKEN_KEY}`
      },
      body: JSON.stringify(user)
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e));
        } else {
          return res.json();
        }
      })
      .then(res => {
        tokenService.create(res.token);
        tokenService.storeUser(res.username);
        this.setState({
          userId: res.id,
          userName: res.username,
          userEmail: res.email,
          loggedIn: true
        });
        this.fetchTours();
      })
      .catch(error => {
        console.error({ error })
      })
  };

  fetchPosts = () => {
    fetch(`${config.API_ENDPOINT}/api/posts`, {
      method: "Get",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ posts: res });
      })
      .catch(err => {
        this.setState({ posts: this.props.posts });
      });
  };

  handleSignOut = () => {
    tokenService.remove();
    this.setState({
      loggedIn: false,
      userId: "",
      userLastName: "",
      userFirstName: ""
    });
    this.fetchPosts()
  };

  setPostList = postList => {
    this.setState({ postList })
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setPost = post => {
    this.setState({ post })
  }

  setComments = comments => {
    this.setState({ comments })
  }

  clearPost = () => {
    this.setPost(nullPost)
    this.setComments([])
  }

  addComment = comment => {
    this.setComments([
      ...this.state.comments,
      comment
    ])
  }

  render() {
    let backDrop;

    if (this.state.sideDrawerOpen) {
      backDrop = <BackDrop />;
    }

    const value = {
      loggedIn: this.state.loggedIn,
      signUp: this.signUp,
      logIn: this.logIn,
      drawerToggleClickHandler: this.drawerToggleClickHandler,
      backDropClickHandler: this.backDropClickHandler,
      userName: this.state.userName,
      userFirstName: this.state.userFirstName,
      userLastName: this.state.userLastName,
      handleSignOut: this.handleSignOut,
      postList: this.state.postList,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setPostList: this.setPostList,
      post: this.state.post,
      comments: this.state.comments,
      setPost: this.setPost,
      setComments: this.setComments,
      clearPost: this.clearPost,
      addComment: this.addComment,
      userid: this.state.userId,
      posts: this.state.posts,
    }
    return (
      <div className="App" style={{ height: "100%" }}>
        <NavBarContext.Provider value={value}>
          <header className="App-header">
            <NavBar drawerClickHandler={this.drawerToggleClickHandler} />
            <SideDrawer show={this.state.sideDrawerOpen} />
            {backDrop}
            {/* 
            <section className="App-name-motto">
              <Route
                // exact
                path={'/landing'}
                component={LandingPage}
              />
            </section> */}
          </header>
          <main className="App__main">
            {this.state.hasError === true && <p className="red">There was an error! Please try again.</p>}
            <MainPage />
          </main>
        </NavBarContext.Provider>
      </div>
    );
  }
}

export default App;
