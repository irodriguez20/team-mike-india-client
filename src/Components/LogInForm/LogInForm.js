import React from "react";
import NavBarContext from '../../contexts/NavBarContext';
import { Redirect } from "react-router-dom";

class LogInForm extends React.Component {
    state = {
        routeToHome: false
    };

    handleSubmit = e => {
        e.preventDefault();

        const { email, password } = e.target;
        const userInfo = {
            email: email.value,
            password: password.value,
        }

        this.context.logIn(userInfo);
        this.setState({ routeToHome: true });

    }

    static contextType = NavBarContext;

    render() {

        return (
            <main>
                {this.state.routeToHome && <Redirect to="/posts" />}
                <header role="banner">
                    <h2>Welcome Back!</h2>
                    <h4>Please log in</h4>
                </header>
                <form className="signup-form" onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"

                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"

                        />
                    </div>
                    <button
                        type="submit"
                    // onClick={e => {
                    //     e.preventDefault();
                    //     if (userInfo.email.length === 0) {
                    //         window.alert("email cannot be empty");
                    //     } else if (userInfo.password.length === 0) {
                    //         window.alert("password cannot be empty");
                    //     } else {
                    //         this.context.logIn(userInfo);
                    //         this.setState({ routeToHome: true });
                    //     }
                    // }}
                    >
                        Log in
          </button>
                </form>
            </main>
        );
    }
}

export default LogInForm;