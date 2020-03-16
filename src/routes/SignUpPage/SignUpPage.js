import React, { Component } from 'react';
import { Section } from '../../Components/Utils/Utils';
import SignUpForm from '../../Components/SignUpForm/SignUpForm';

export default class RegistrationPage extends Component {
    static defaultProps = {
        history: {
            push: () => { },
        },
    }

    handleRegistrationSuccess = user => {
        const { history } = this.props
        history.push('/login')
    }

    render() {
        return (
            <Section className='SignUpPage'>
                <SignUpForm
                    onRegistrationSuccess={this.handleRegistrationSuccess}
                />
            </Section>
        )
    }
}
