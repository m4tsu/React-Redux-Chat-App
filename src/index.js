import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
// import store from "./store";
import './index.css';
import reducer from './reducers'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {muiTheme} from './muiTheme';

import App from './containers/App';
import ChatRoom from './containers/ChatRoom';
import Home from './containers/Home'
import Header from './components/layout/Header'

// import firebase from 'firebase';
import * as serviceWorker from './serviceWorker';

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
