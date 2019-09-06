import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from "react-redux";
// import store from "./store";
import './index.css';
import reducer from './reducers'
import App from './containers/App';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
