import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles } from '@material-ui/core/styles'

import { readMessages } from '../../actions'

// const styles = theme => ({
//   root: {
//     padding: theme.spacing.unit * 5,
//   },
//   content: {
//     maxWidth: 800,
//     marginLeft  : 'auto',
//     marginRight : 'auto',
//   },
// })

class Message extends Component {
  render() {
    const messages = this.props.messages;
    const styles = {
      root: {
        padding: '50px',
      },
      content: {
        maxWidth: 800,
        width: '80%',
        marginLeft  : 'auto',
        marginRight : 'auto',
      },
    }

    const messagesList = messages.map((message) => {
      return (
        <ListItem key={message.id}>
          <ListItemText className='message-user-name'>{message.user}</ListItemText>
          <ListItemText className='message-content'>{message.content}</ListItemText>
        </ListItem>
      )
    });

    return (
      <React.Fragment>
        <div style={styles.root}>
          <div style={styles.content}>
            <List className='messages-wrap'>{messagesList}</List>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({ messages: state.messages})
// const mapDispatchToProps =

export default connect(mapStateToProps, null)(Message)
