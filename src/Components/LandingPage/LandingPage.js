import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';


class LandingPage extends Component {
    render() {
        return (
            <div className="LandingPage">
                <main className="LandingPage__main">
                    <header className="LandingPage__title">
                        <h1>Welcome To upLift</h1>
                        <h3>Where we believe mentorship should be accessible to everyone.</h3>
                    </header>
                    <section className="LandingPage__why">
                        Education is expensive. Mentorship is expensive. However, both should be
                        easily accessible to everyone who desires knowledge and to grow intellectually.
                        At upLift we believe in Denzel Washington's famous quote, 'When you get it, reach back, pull
                        someone else up. Each one, teach one.'
                    </section>
                    <section className="LandingPage__why">
                        upLift is completely free for all users. Share your knowledge with others by becoming a mentor,
                        or gain knowledge from others to help grow in your career or grow your intellectual network. The
                        knowledge you can gain and give is limitless.
                    </section>
                    <button className="signUp_landing">
                        <Link to="/signup">Let's Grow</Link>
                    </button>
                </main>
            </div>
        )
    }
}

export default LandingPage;