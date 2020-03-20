import React, { Component } from 'react';
import NavBarContext from '../../contexts/NavBarContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './UsersListItem.css';
import { Link } from 'react-router-dom';
// import UserProfile from '../Profile/Profile';


export default class UsersListItem extends Component {
    static defaultProps = {
        match: { params: {} },
    }
    static contextType = NavBarContext;

    handleClickMessage = e => {
        console.log('clicked message');
    }

    handleClickConnect = e => {
        console.log('clicked connect');
    }

    // updateContext = user => {
    //     this.context.setUserForProfile(user)
    // }


    render() {
        const { user } = this.props
        // const { setUserForProfile } = this.context

        return (
            <Link to={`/users/${user.id}`} className='UsersListItem' >
                <div className="upper-container">
                    <div className="image-container">
                        <FontAwesomeIcon size='7x' icon='user-circle' />
                        <span className='fas fa-user-circle'></span>
                    </div>
                </div>
                <section className='UserProfile__names'>
                    <h3>{user.first_name} {user.last_name}</h3>
                    <h4>{user.username}</h4>
                    <button onClick={this.handleClickMessage}>Message</button>
                    <button onClick={this.handleClickConnect}>Connect</button>
                </section>
            </Link>
        )
    }
}

