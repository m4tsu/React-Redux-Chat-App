import React from 'react';
import '../App.scss';
import logo from '.././logo.svg';
import { Link } from 'react-router-dom'

import { readMessages } from '../actions'

import Message from '../components/chatRoom/Message'
import MessageForm from '../components/chatRoom/MessageForm'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <MessageForm/>
      <Message />
    </div>
  );
}

export default App;
