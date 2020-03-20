import React, { Component } from "react";
// import { Route, Switch } from 'react-router-dom';
import NavBar from "../NavBar/NavBar";
// import PrivateRoute from '../Utils/PrivateRoute';
// import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
// import PostPage from '../../routes/PostPage/PostPage';
// import LoginPage from '../../routes/LoginPage/LoginPage';
// import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
// import SignUpPage from '../../routes/SignUpPage/SignUpPage';
// import PostListPage from '../../routes/PostListPage/PostListPage';
import SideDrawer from "../../Components/sidedrawer/SideDrawer";
import BackDrop from "../../Components/backdrop/BackDrop";
import NavBarContext, { nullPost } from "../../contexts/NavBarContext";
import { tokenService } from "../../services/token-service";
import "./App.css";
// import LandingPage from '../LandingPage/LandingPage';
import MainPage from "../MainPage/MainPage";
import AuthApiService from "../../services/auth-api-service";
import config from "../../config";

class App extends Component {
  state = {
    hasError: false,
    loggedIn: false,
    userId: "",
    email: "",
    userName: tokenService.userName,
    userFirstName: "",
    userLastName: "",
    token: tokenService.token,
    users: [],
    channels: [],
    channelsSearchResults: [],
    sideDrawerOpen: false,
    searchResults: [],
    post: nullPost,
    posts: [],
    postList: [],
    comments: [],
    commentsList: [],
    messages: [],
    error: null,
    allUsers: [],
    allMessages: []
    // searchLocation: ""
  };

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  // fetchAllMessages = () => {
  //   const options = {
  //     method: "Get",
  //     headers: new Headers({
  //       "Content-Type": "application/json"
  //     })
  //   };

  //   fetch(`http://localhost:8000/api/messages`, options)
  //     .then(res => res.json())
  //     .then(res => {
  //       console.log(res);
  //       this.setState({ allMessages: res });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  fetchAllUsers = () => {
    const options = {
      method: "Get",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    };
    fetch(`${config.API_ENDPOINT}/api/users`, options)
      .then(res => res.json())
      .then(res => {
        console.log(res);

        this.setState({ allUsers: res });
      })
      .catch(err => {
        console.log(err);
      });
  };

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
        // token: this.state.token,
      };

      fetch(`${config.API_ENDPOINT}/api/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loggedInUser)
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          // console.log(res);
          this.setState({
            loggedIn: true,
            userId: res.id,
            userLastName: res.lastName,
            userFirstName: res.firstName,
            userName: res.userName,
            token: res.token,
            email: res.email
          });
          this.fetchPosts();
          this.fetchComments();
          // this.fetchAllMessages();
          this.fetchAllUsers();
        })
        .catch(err => {
          console.error({ err });
        });
    } else {
      this.fetchPosts();
      this.fetchComments();
    }
  }

  signUp = userInfo => {
    const newUser = {
      username: userInfo.username,
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      email: userInfo.email,
      password: userInfo.password
    };

    // this.logIn(newUser);
    fetch(`${config.API_ENDPOINT}/api/users`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json"
        // "auth": `${config.TOKEN_KEY}`
      }
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        const user = {
          email: res.email,
          password: res.password
        };
        this.logIn(user);
        this.fetchPosts();
        this.fetchComments();
      })
      .catch(error => {
        console.error({ error });
      });
  };

  logIn = userInfo => {
    // const user = {
    //   email: userInfo.email,
    //   password: userInfo.password
    // };

    this.setState({
      // userId: user.id,
      email: userInfo.email,
      loggedIn: true
    });
    AuthApiService.postLogin(userInfo);
    fetch(`${config.API_ENDPOINT}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // "authorization": `${config.TOKEN_KEY}`
      },
      body: JSON.stringify(userInfo)
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
          email: res.email,
          loggedIn: true
        });
        this.fetchPosts();
        this.fetchComments();
      })
      .catch(error => {
        console.error({ error });
      });
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

  handleAddPost = post => {
    this.setState({
      posts: [...this.state.posts, post]
    });
  };

  fetchComments = () => {
    fetch(`${config.API_ENDPOINT}/api/comments`, {
      method: "Get",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ comments: res });
      })
      .catch(err => {
        this.setState({ comments: this.props.comments });
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
    this.fetchPosts();
    this.fetchComments();
  };

  setPostList = postList => {
    this.setState({ postList });
  };

  setError = error => {
    console.error(error);
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  setUsers = users => {
    this.setState({ users });
  };

  setPost = post => {
    this.setState({ post });
  };

  setComments = comments => {
    this.setState({ comments });
  };
  setCommentsList = commentsList => {
    this.setState({ commentsList });
  };

  clearPost = () => {
    this.setPost(nullPost);
    this.setComments([]);
  };

  addComment = comment => {
    this.setComments({
      comments: [...this.state.comments, comment]
    });
  };

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
      commentsList: this.state.commentsList,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      users: this.state.users,
      setUsers: this.setUsers,
      setPostList: this.setPostList,
      post: this.state.post,
      comments: this.state.comments,
      setPost: this.setPost,
      setComments: this.setComments,
      setCommentsList: this.setCommentsList,
      clearPost: this.clearPost,
      addComment: this.addComment,
      addPost: this.handleAddPost,
      userid: this.state.userId,
      posts: this.state.posts,
      allUsers: this.state.allUsers,
      allMessages: this.state.allMessages
    };
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
          <main
            className="App__main"
            style={{ maxWidth: "1100px", margin: "60px auto 5px auto" }}
          >
            {this.state.hasError === true && (
              <p className="red">There was an error! Please try again.</p>
            )}
            <MainPage />
          </main>
        </NavBarContext.Provider>
      </div>
    );
  }
}

export default App;
