import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.scss';
import { Link, Redirect } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'

import Messages from '../components/chatRoom/Messages'
import MessageForm from '../components/chatRoom/MessageForm'
import Header from '../components/layout/Header'

import firebase from 'firebase'

class ChatRoom extends Component {
  render() {
    return(
      <React.Fragment>
        <div style={{width: '80%', maxWidth: '800px' , margin: '0 auto'}}>
          <Messages/>
        </div>
        <MessageForm/>
      </React.Fragment>
    )
  }
}


const mapStateToProps = state => ({ auth: state.auth })

export default connect(mapStateToProps, null)(ChatRoom)