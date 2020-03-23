import React from "react";
import NavBarContext from '../../contexts/NavBarContext';
import { Redirect } from "react-router-dom";
import config from "../../config";
import "./SignUpForm.css";

class SignUpForm extends React.Component {
    state = {
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
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

    handleSubmitSignIn = e => {
        e.preventDefault();

        const { email, password } = e.target;
        const userInfo = {
            email: email.value,
            password: password.value,
        }

        this.context.logIn(userInfo);
    };

    handleSubmitSignUp = e => {
        e.preventDefault();

        const { username, first_name, last_name, email, password } = e.target;
        const newUser = {
            username: username.value,
            first_name: first_name.value,
            last_name: last_name.value,
            email: email.value,
            password: password.value
        }

        this.context.signUp(newUser);

        // fetch(`${config.API_ENDPOINT}/api/users`, {
        //     method: "POST",
        //     body: JSON.stringify(newUser),
        //     headers: {
        //         "content-type": "application/json"
        //     }
        // })
        //     .then(res => {
        //         if (!res.ok) {
        //             return res.json().then(e => Promise.reject(e));
        //         }
        //         return res.json();
        //     })
        //     .then(user => {
        //         username.value = "";
        //         first_name.value = "";
        //         last_name.value = "";
        //         email.value = "";
        //         password.value = "";
        //         this.context.signUp(user)
        //     })
        //     .catch(error => {
        //         console.error({ error });
        //     });
    };


    render() {
        // const userInfo = {
        //     username: this.state.username,
        //     first_name: this.state.first_name,
        //     last_name: this.state.last_name,
        //     email: this.state.email,
        //     password: this.state.password
        // };

        return (
            <main className="signUp__signIn">
                {this.context.loggedIn && <Redirect to="/posts" />}
                <div className={this.state.signUpToggle} id="container">
                    <div className="form-container sign-up-container">
                        <form action="#" className="signUp__signIn-form" onSubmit={this.handleSubmitSignUp}>
                            <h1>Create Account</h1>
                            <input
                                required
                                placeholder="First name"
                                type="text"
                                name="first_name"
                                id="first_name"
                            // onChange={e => { e.preventDefault(); this.setState({ first_name: e.target.value }) }}
                            />
                            <input
                                required
                                placeholder="Last name"
                                type="text"
                                name="last_name"
                                id="last_name"
                            // onChange={e => { e.preventDefault(); this.setState({ last_name: e.target.value }) }}
                            />
                            <input
                                required
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                            // onChange={e => { e.preventDefault(); this.setState({ email: e.target.value }) }}
                            />
                            <input
                                required
                                type="username"
                                name="username"
                                id="username"
                                placeholder="username"
                            // onChange={e => { e.preventDefault(); this.setState({ username: e.target.value }) }}
                            />
                            <input
                                required
                                type="password"
                                placeholder="Password"
                                name="password"
                                id="password"
                            // onChange={e => { e.preventDefault(); this.setState({ password: e.target.value }) }}
                            />
                            <button
                                type='submit'
                            // onClick={e => {
                            //     e.preventDefault();
                            //     this.context.signUp(userInfo);
                            //     // this.setState({ routeToHome: this.context.loggedIn });
                            // }}
                            >
                                Sign Up
              </button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form action="#" className="sign-in-container-form" onSubmit={this.handleSubmitSignIn}>
                            <h1>Sign in</h1>
                            <input
                                required
                                type="email"
                                name="email"
                                id="user-signin-email"
                                placeholder="Email"
                            // onChange={e => { e.preventDefault(); this.setState({ email: e.target.value }) }}
                            />
                            <input
                                required
                                type="password"
                                name="password"
                                id="user-signin-password"
                                placeholder="Password"
                            // onChange={e => { e.preventDefault(); this.setState({ password: e.target.value }) }}
                            />
                            <button
                                type='submit'
                            // onClick={e => {
                            //     e.preventDefault();
                            //     const loginInfo = {
                            //         email: this.state.email,
                            //         password: this.state.password
                            //     };
                            //     this.context.logIn(loginInfo);
                            //     // this.setState({ routeToHome: this.context.loggedIn });
                            // }}
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