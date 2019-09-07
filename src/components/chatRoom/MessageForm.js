import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm, reset } from 'redux-form'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
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
        error={!!(touched && error)}
        helperText={touched && error}
        {...input}
      />
    )
  }

  onSubmit(message) {
    this.props.postMessage(message)
  }

  render() {
    const { handleSubmit, submitting } = this.props
    const style = { margin: '.6rem'}
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div>
          <Field label='User' name='user' type='text' component={this.renderField}/>
        </div>
        <div>
          <Field label='Content' name='content' type='textarea' component={this.renderField}/>
        </div>
        <Button type='submit' variant='contained' children='Submit' color='primary' style={style} disabled={submitting}/>
      </form>
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