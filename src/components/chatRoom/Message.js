import React, { Component } from 'react';
import { connect } from 'react-redux';

import { readMessages } from '../../actions'

class Message extends Component {
  render() {
    const messages = this.props.messages;
    const messagesList = messages.map((message) => {
      return (
        <li key={message.id}>
          <p className='message-user-name'>{message.user}</p>
          <p className='message-content'>{message.content}</p>
        </li>
      )
    });

    return (
      <React.Fragment>
        <ul className='messages-wrap'>{messagesList}</ul>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({ messages: state.messages})
// const mapDispatchToProps =

export default connect(mapStateToProps, null)(Message)
