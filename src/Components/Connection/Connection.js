import React, { Component } from 'react';
import { Link } from "react-router-dom";
import NavBarContext from "../../contexts/NavBarContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { findUser } from '../../services/helperFunctions';
// import { findUserConnectionInfo } from '../../services/helperFunctions';

export default class Connection extends Component {
    static defaultProps = {
        match: { params: {} }
    };
    static contextType = NavBarContext;


    render() {
        const { user } = this.props;
        const { allUsers = [] } = this.context

        // const connectionBody = {
        //   userid: user.id,
        //   followerid: this.context.userid
        // }


        return (
            <Link to={`/users/${user.followerid}`} className="UsersListItem">
                <div className="upper-container">
                    <div className="image-container">
                        <FontAwesomeIcon size="7x" icon="user-circle" />
                        <span className="fas fa-user-circle"></span>
                    </div>
                </div>
                <FindUserInfo userid={user.followerid} users={allUsers} />
            </Link>
        );
    }
}


function FindUserInfo({ userid, users }) {
    let result = users;

    if (userid) {
        result = [];
        for (let i = 0; i < users.length; ++i) {
            let connection = users[i];
            if (connection.id == userid)
                result.push(connection);
        }
    }
    return (
        <div>
            {result.map(connection =>
                <section className="UserProfile__names" key={connection.id}>
                    <h3>
                        {connection.first_name} {connection.last_name}
                    </h3>
                    <h4>{connection.username}</h4>
                    <button>Message</button>{" "}
                </section>
            )}
        </div>
    )
}