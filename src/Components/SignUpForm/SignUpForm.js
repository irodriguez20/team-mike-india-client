import React from "react";
import NavBarContext from '../../contexts/NavBarContext';
import { Redirect } from "react-router-dom";
import "./SignUpForm.css";

class SignUpForm extends React.Component {
    state = {
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        // routeToHome: false,
        signUpToggle: "container"
    };

    static contextType = NavBarContext;

    handleSignUpToggle = () => {
        this.setState({ signUpToggle: "container right-panel-active" });
    };

    handleSignInToggle = () => {
        this.setState({
            signUpToggle: "container"
        });
    };

    render() {
        const userInfo = {
            username: this.state.username,
            f_name: this.state.first_name,
            l_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password
        };

        return (
            <main className="signUp__signIn">
                {this.context.loggedIn && <Redirect to="/posts" />}
                <div className={this.state.signUpToggle} id="container">
                    <div className="form-container sign-up-container">
                        <form action="#" className="signUp__signIn-form">
                            <h1>Create Account</h1>
                            {/* <div className="social-container">
                <a href="#" className="social">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-google-plus-g"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <span>or use your email for registration</span> */}
                            <input
                                placeholder="First name"
                                type="text"
                                required
                                name="first-name"
                                id="first-name"
                                onChange={e => this.setState({ first_name: e.target.value })}
                            />
                            <input
                                placeholder="Last name"
                                required
                                type="text"
                                name="last-name"
                                id="last-name"
                                onChange={e => this.setState({ last_name: e.target.value })}
                            />
                            <input
                                required
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                onChange={e => this.setState({ email: e.target.value })}
                            />
                            <input
                                required
                                type="username"
                                name="username"
                                id="username"
                                placeholder="username"
                                onChange={e => this.setState({ username: e.target.value })}
                            />
                            <input
                                required
                                type="password"
                                placeholder="Password"
                                name="password"
                                id="password"
                                onChange={e => this.setState({ password: e.target.value })}
                            />
                            <button
                                onClick={e => {
                                    e.preventDefault();
                                    this.context.signUp(userInfo);
                                    // this.setState({ routeToHome: this.context.loggedIn });
                                }}
                            >
                                Sign Up
              </button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form action="#">
                            <h1>Sign in</h1>
                            <input
                                required
                                type="email"
                                name="email"
                                id="user-signin-email"
                                placeholder="Email"
                                onChange={e => this.setState({ email: e.target.value })}
                            />
                            <input
                                required
                                type="password"
                                name="password"
                                id="user-signin-password"
                                placeholder="Password"
                                onChange={e => this.setState({ password: e.target.value })}
                            />
                            <button
                                onClick={e => {
                                    e.preventDefault();
                                    const loginInfo = {
                                        email: this.state.email,
                                        password: this.state.password
                                    };
                                    this.context.logIn(loginInfo);
                                    // this.setState({ routeToHome: this.context.loggedIn });
                                }}
                            >
                                Sign In
              </button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p>
                                    To keep connected with us please login with your personal info
                </p>
                                <button
                                    className="ghost"
                                    id="signIn"
                                    onClick={() => this.handleSignInToggle()}
                                >
                                    Sign In
                </button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>Grow your intellectual network and gain the knowledge to advance your career</p>
                                <button
                                    className="ghost"
                                    id="signUp"
                                    onClick={() => this.handleSignUpToggle()}
                                >
                                    Sign Up
                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default SignUpForm;