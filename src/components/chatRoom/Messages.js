import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles } from '@material-ui/core/styles'

import { fetchMessages} from '../../actions'

class Message extends Component {
  componentDidMount() {
    this.props.fetchMessages();
  }

  componentDidUpdate() {
    console.log(this.props.messages);
  }

  renderMessages() {
    return (
      _.map(this.props.messages, message => {
        return (
          <ListItem key={message.id}>
            <ListItemText className='message-user-name'>{message.userId}</ListItemText>
            <ListItemText className='message-content'>{message.content}</ListItemText>
          </ListItem>
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
        <div style={styles.root}>
          <div style={styles.content}>
            <List className='messages-wrap'>{this.renderMessages()}</List>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({ messages: state.messages })
const mapDispatchToProps = ({ fetchMessages })

export default connect(mapStateToProps, mapDispatchToProps)(Message)
