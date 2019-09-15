import React, { Component } from 'react';
import firebase from 'firebase';
import { usersRef } from '../../firebase/firestore'
import { connect } from 'react-redux'
import { Field, reduxForm, reset } from 'redux-form'
import '../../App.scss';
import { authLoading, updateUserName } from '../../actions'


import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const loginStyles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  async onSubmit(signUpInfo) {
    await this.signUp(signUpInfo);
  }

  signUp(signUpInfo) {
    firebase.auth().createUserWithEmailAndPassword(signUpInfo.email, signUpInfo.password)
    .then(value => {
      usersRef.doc(value.user.uid).set({
        displayName: signUpInfo.userName,
        uid: value.user.uid,
      })
      value.user.updateProfile({
        displayName: signUpInfo.userName,
      })
      .then(()=> {
        this.props.updateUserName(signUpInfo.userName)
        this.props.history.push('/');
      })
      .catch(error => {
        alert(error.mesasge)
      })
    })
    .catch(error => {
      alert(error.message)
    })
  }

  renderField(field) {
    const { input, id, label, name, type, meta: {touched, error} } = field
    return (
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id={id}
        label={label}
        name={name}
        type={type}
        error={touched && !!error}
        {...input}
      />
    )
  }

  render() {
    const { handleSubmit, submitting, invalid } = this.props
    const classes = this.props.classes
    return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign UP
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(this.onSubmit)}>
          <Field id='userName' label='User Name' name='userName' type='text' component={this.renderField} />
          <Field id='email' label='Email' name='email' type='email' component={this.renderField}/>
          <Field id='password' label='Password' name='password' type='password' component={this.renderField}/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={submitting || invalid}
          >
            Sign UP
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              {/* <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link> */}
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    );
  }
}

const validate = values => {
  const errors = {}
  if (!values.userName) errors.userName = 'User Name is required'
  if (!values.email) errors.email = 'Email is required'
  if (!values.password || (values.password.length < 6)) errors.password ='Password is required'
  return errors
}
// export default withStyles(loginStyles)(Login) ;

const mapStateToProps = state => ({ auth: state.auth })
const mapDispatchToProps = ({ updateUserName })

export default withStyles(loginStyles)(connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'loginForm',
    validate
  })(SignUp)
  ))