import React from "react";
import toursAndUserContext from "../context/toursAndUserContext.js";
import { Redirect } from "react-router-dom";

class LogInForm extends React.Component {
    state = {
        email: "",
        password: "",
        routeToHome: false
    };

    static contextType = toursAndUserContext;

    render() {
        const userInfo = {
            email: this.state.email,
            password: this.state.password
        };

        return (
            <main>
                {this.state.routeToHome && <Redirect to="/home" />}
                <header role="banner">
                    <h2>Welcome Back!</h2>
                    <h4>Please log in</h4>
                </header>
                <form className="signup-form">
                    <div>
                        <label htmlFor="username">Email</label>
                        <input
                            type="email"
                            name="username"
                            id="username"
                            onChange={e => this.setState({ email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={e => this.setState({ password: e.target.value })}
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={e => {
                            e.preventDefault();
                            if (userInfo.email.length === 0) {
                                window.alert("email cannot be empty");
                            } else if (userInfo.password.length === 0) {
                                window.alert("password cannot be empty");
                            } else {
                                this.context.logIn(userInfo);
                                this.setState({ routeToHome: true });
                            }
                        }}
                    >
                        Log in
          </button>
                </form>
            </main>
        );
    }
}

export default LogInForm;