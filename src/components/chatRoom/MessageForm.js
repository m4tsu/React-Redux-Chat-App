import React, { Component } from 'react';
import firebase from 'firebase'
import { connect } from 'react-redux'
import { Field, reduxForm, reset } from 'redux-form'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

import { postMessage } from '../../actions'
import clsx from 'clsx';

class MessageForm extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  renderField(field) {
    const { input, label, type, meta: { touched, error }} = field
    return(
      <TextField
        label={label}
        type={type}
        variant='outlined'
        margin={type === 'textarea' ? 'dense' : 'none'}
        multiline={type === 'textarea' ? true : false}
        style={{width: '100%'}}
        error={!!(touched && error)}
        helperText={touched && error}
        {...input}
      />
    )
  }

  onSubmit(message) {
    message.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    this.props.postMessage(message)
  }

  render() {
    const { handleSubmit, submitting } = this.props
    const style = { margin: '.6rem'}
    const messageFormStyle = {width: '100vw', padding: '20px 40px', position: 'fixed', bottom: 0, 'background-color': 'white'}
    return (
      <React.Fragment>
        <div style={{height: '100px'}}></div>
        <Paper style = {messageFormStyle}>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <Grid container justify='center' spacing={2}>
              <Grid item xs={3}>
                <Field label='User' name='user' type='text' component={this.renderField}/>
              </Grid >
              <Grid item xs={6}>
                <Field label='Content' name='content' type='textarea' component={this.renderField}/>
              </Grid>
              <Grid item xs={3}>
                <Button type='submit' variant='contained' children='Send' color='primary' style={style} disabled={submitting}/>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </React.Fragment>
    );
  }
}

const validate = message => {
  const errors = {}
  if (!message.user) errors.user = 'User Name required.'
  if(!message.content) errors.content = 'Content required.'
  return errors;
}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('messageNewForm'));

const mapDispatchToProps = ({postMessage})

export default connect(null, mapDispatchToProps)(
  reduxForm({
    validate,
    form: 'messageNewForm',
    onSubmitSuccess: afterSubmit,
  })(MessageForm)
)

