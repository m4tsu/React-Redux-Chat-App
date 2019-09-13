import React, { Component } from 'react';
import '../App.scss';
import logo from '.././logo.svg';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom'

import ChatRoom from './ChatRoom'

class HOME extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Home
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </div>
      </div>
    );
  }
}

export default HOME;
