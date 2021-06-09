import axios from 'axios';
import { store } from 'config/store';
import React from 'react';
import ReactDOM from 'react-dom';
import Media from 'react-media';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';

axios.defaults.baseURL = process.env.REACT_APP_ARCHILOGIC_API_URL

ReactDOM.render(
    <Provider store={store}>
        <Media query="(max-width: 500px)" render={() =>
        (
            <div><img className='device-not-supported' src={require("./warning.png")} alt="" /></div>
        )}
        />
        <Media query="(min-width: 501px)" render={() =>
        (
            <App />
        )}
        />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
