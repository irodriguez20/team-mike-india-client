import React from "react";
import { Route } from "react-router-dom";
import PostPage from '../../routes/PostPage/PostPage';
import LoginPage from '../../routes/LoginPage/LoginPage';
// import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import SignUpPage from '../../routes/SignUpPage/SignUpPage';
import PostListPage from '../../routes/PostListPage/PostListPage';
import LandingPage from '../LandingPage/LandingPage';
import Messages from '../Messages/Messages';
// import PostListItem from "../PostListItem/PostListItem";
// import PrivateRoute from '../Utils/PrivateRoute';
// import PublicOnlyRoute from '../Utils/PublicOnlyRoute';

class MainPage extends React.Component {
    render() {
        return (
            <main className="App__main">
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/posts" component={PostListPage} />
                {/* <Route exact path="/users/:userId" component={UserProfile} /> */}
                <Route exact path="/signup" component={SignUpPage} />
                <Route exact path="/posts/:postId" component={PostPage} />
                <Route exact path="/login" component={LoginPage} />
                <Route path="/messages" component={Messages} />
                {/* <Route exact path="/tours/:tourId" component={PostListItem} /> */}
                {/* <Route exact path="/search/users" component={SearchResultsPage} /> */}
            </main>
        );
    }
}

export default MainPage;
