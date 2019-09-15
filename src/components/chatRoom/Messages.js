import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles } from '@material-ui/core/styles'

import { fetchMessages, deleteMessage } from '../../actions'
import { Button } from '@material-ui/core';

class Message extends Component {
  constructor(props) {
    super(props)
    this.onClickDelete = this.onClickDelete.bind(this)
  }

  componentDidMount() {
    this.props.fetchMessages();
  }

  onClickDelete(messageId) {
    // console.log(messageId)
    this.props.deleteMessage(messageId)
  }

  renderMessages() {
    return (
      _.map(this.props.messages, message => {
        const fromOthers = !(this.props.auth.currentUser.displayName === message.userName)
        return (
          <div key={message.id} className={`message-wrap ${fromOthers ? 'others' : 'own'}`} >
            <ListItem className='message-item' >
              {fromOthers ? <ListItemText>@{message.userName}</ListItemText> : ''}
              <ListItemText className='message-content'>{message.content}</ListItemText>
            </ListItem>
            <Button onClick={this.onClickDelete.bind(this, message.id)}>削除</Button>
          </div>
        );
      })
    )
  }

  render() {
    const styles = {
      root: {
        padding: '50px',
      },
      content: {
        maxWidth: 800,
        width: '100%',
        marginLeft  : 'auto',
        marginRight : 'auto',
      },
    }

    return (
      <React.Fragment>
        <div style={styles.content}>
          <List className='messages-wrap'>{this.renderMessages()}</List>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({ messages: state.messages, auth: state.auth })
const mapDispatchToProps = ({ fetchMessages, deleteMessage })

export default connect(mapStateToProps, mapDispatchToProps)(Message)
