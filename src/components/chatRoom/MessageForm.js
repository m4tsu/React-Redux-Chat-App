import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { postMessage } from '../../actions'

class MessageForm extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  renderField(field) {
    const { input, label, type, meta: { touched, error }} = field
    return(
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched && error && <span>{error}</span>}
      </div>
    )
  }

  onSubmit(message) {
    this.props.postMessage(message)
  }

  render() {
    const { handleSubmit, submitting } = this.props
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div>
          <Field label='User' name='user' type='text' component={this.renderField}/>
        </div>
        <div>
          <Field label='Content' name='content' type='text' component={this.renderField}/>
        </div>
        <input type='submit' value='Submit' disabled={submitting}/>
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

const mapDispatchToProps = ({postMessage})

export default connect(null, mapDispatchToProps)(
  reduxForm({ validate, form: 'messageNewForm'})(MessageForm)
)