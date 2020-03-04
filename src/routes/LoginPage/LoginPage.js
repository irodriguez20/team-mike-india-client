import React, { Component } from 'react';
import LogInForm from '../../Components/LogInForm/LogInForm';
import { Section } from '../../Components/Utils/Utils';

export default class LoginPage extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => { },
        },
    }

    handleLoginSuccess = () => {
        const { location, history } = this.props
        const destination = (location.state || {}).from || '/posts'
        history.push(destination)
    }

    render() {
        return (
            <Section className='LoginPage'>
                <h2>Login</h2>
                <LogInForm
                    onLoginSuccess={this.handleLoginSuccess}
                />
            </Section>
        )
    }
}
