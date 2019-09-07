import React, { Component } from 'react';
import '../App.scss';
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'

import Messages from '../components/chatRoom/Messages'
import MessageForm from '../components/chatRoom/MessageForm'
import Header from '../components/layout/Header'

class ChatRoom extends Component {
  render() {
    return(
      <React.Fragment>
        <Header/>
        <div style={{width: '80%', maxWidth: '800px' , margin: '0 auto'}}>
          <MessageForm/>
          <Paper>
            <Messages/>
          </Paper>
        </div>
      </React.Fragment>
    )
  }
}

export default ChatRoom;