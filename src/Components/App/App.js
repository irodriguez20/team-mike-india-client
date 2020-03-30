import React, { Component } from "react";
import NavBar from "../NavBar/NavBar";
import SideDrawer from "../../Components/sidedrawer/SideDrawer";
import BackDrop from "../../Components/backdrop/BackDrop";
import NavBarContext, { nullPost } from "../../contexts/NavBarContext";
import { tokenService } from "../../services/token-service";
import "./App.css";
import MainPage from "../MainPage/MainPage";
import AuthApiService from "../../services/auth-api-service";
import config from "../../config";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

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
    userForProfile: [],
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
    allMessages: [],
    allUserFollowers: []
    // searchLocation: ""
  };

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  fetchAllUserFollowers = () => {
    const options = {
      method: "Get",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    };

    fetch(`${config.API_ENDPOINT}/api/userfollowers`, options)
      .then(res => res.json())
      .then(res => {
        // const userConnection = {
        //   connectionid: res.connectionid,
        //   userid: res.userid,
        //   followerid: res.followerid
        // }
        this.setState({
          allUserFollowers: res
        });
      })
      .catch(err => {
        console.log(err);
      });
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
          this.fetchAllUserFollowers();
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
        this.fetchAllUserFollowers();
      })
      .catch(error => {
        console.error({ error });
      });
  };

  logIn = userInfo => {

    AuthApiService.postLogin(userInfo);
    fetch(`${config.API_ENDPOINT}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
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
        this.fetchAllUsers();
        this.fetchAllUserFollowers();
      })
      .catch(error => {
        // console.error({ error });
        Swal.fire(`Username or password incorrect. Please try again or sign up: ${error.error.message}`);
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
      posts: [
        ...this.state.posts,
        post
      ],
      postList: [
        ...this.state.postList,
        post
      ],
    })
    this.fetchPosts()
    this.setPostList(this.state.posts)
  }

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

  handleProfileLink = () => {
    const loggedInUser = {
      userName: this.state.userName,
      userFirstName: this.state.userFirstName,
      userLastName: this.state.userLastName,
    };

    fetch(`${config.API_ENDPOINT}/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loggedInUser)
    })
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          loggedIn: true,
          userId: res.id,
          userLastName: res.lastName,
          userFirstName: res.firstName
        });
        this.fetchPosts()
        this.fetchComments()
        this.setUsers(this.state.users)
        this.fetchAllUserFollowers();
      })
      .catch(error => {
        console.error({ error });
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

  setUserForProfile = user => {
    this.setState({ userForProfile: user })
  }

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
    this.setState({
      comments: [
        ...this.state.comments,
        comment
      ]
    })
    this.fetchComments()
    this.setCommentsList(this.state.comments)
  }

  handleClickConnect = connectionBody => {

    const newConnection = {
      userid: connectionBody.userid,
      followerid: connectionBody.followerid
    };

    const connectedUser = this.state.allUsers.filter(user => user.id === connectionBody.userid)


    // Post connection
    fetch(`${config.API_ENDPOINT}/api/userfollowers`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(newConnection)
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e));
        }
        Swal.fire(`You've connected with ${connectedUser[0].username}`)
        this.fetchAllUserFollowers();
      })

      .catch(err => {
        Swal.fire(err.error.message);
      });
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
      handleProfileLink: this.handleProfileLink,
      postList: this.state.postList,
      commentsList: this.state.commentsList,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      users: this.state.users,
      userForProfile: this.state.userForProfile,
      setUserForProfile: this.setUserForProfile,
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
      allMessages: this.state.allMessages,
      handleClickConnect: this.handleClickConnect,
      allUserFollowers: this.state.allUserFollowers,
    };
    return (
      <div className="App" style={{ height: "100%" }}>
        <NavBarContext.Provider value={value}>
          <header className="App-header">
            <NavBar drawerClickHandler={this.drawerToggleClickHandler} />
            <SideDrawer show={this.state.sideDrawerOpen} />
            {backDrop}
          </header>
          <main
            className="App__main"
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
