import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './Components/App/App';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFrog, faListUl, faListOl, faPenAlt, faGlobeAmericas, faBookOpen, faComment, faQuoteLeft, faUserCircle, faUsers, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import * as serviceWorker from './serviceWorker';

library.add(
    faFrog, // logo
    faListUl, // style: listicle
    faListOl, // style: howto
    faGlobeAmericas, // style: news
    faPenAlt, // style: interview
    faBookOpen, // style: story
    faComment,
    faQuoteLeft,
    faUserCircle,
    faUsers,
    faPaperPlane
)

ReactDOM.render(
    <BrowserRouter>

        <App />

    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
