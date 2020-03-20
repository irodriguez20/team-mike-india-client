import React, { Component } from 'react';
import NavBarContext from '../../contexts/NavBarContext';
import UsersListItem from '../../Components/UsersListItem/UsersListItem';
// import config from '../../config';
import PropTypes from 'prop-types';
import './UsersListPage.css';

export default class UsersListPage extends Component {
    static propTypes = {
        history: PropTypes.shape({
            push: () => { }
        }).isRequired,
    };

    static contextType = NavBarContext;

    render() {
        const { users = [] } = this.context

        return (
            <div className='UsersListPage_container'>
                {users.map(user =>
                    <UsersListItem
                        key={user.id}
                        user={user}
                    />
                )}
            </div>
        )
    }
}