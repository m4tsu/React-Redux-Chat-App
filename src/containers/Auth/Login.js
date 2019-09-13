import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux'
import { Field, reduxForm, reset } from 'redux-form'
import '../../App.scss';
import { Link } from 'react-router-dom'
// import { login } from '../../actions'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
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

class Login extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(loginInfo) {
    this.login(loginInfo);
  }

  login(loginInfo)  {
    console.log(loginInfo)
    firebase.auth().signInWithEmailAndPassword(loginInfo.email, loginInfo.password)
    .then(value => {
      console.log('login successed')
      this.props.history.push('/chat')
    })
    .catch( error => {
      const errorMessage = error.message;
      alert(errorMessage);
    })
  }

  renderField(field) {
    const { input, id, label, name, type } = field
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
        {...input}
      />
    )
  }

  render() {
    const { handleSubmit, submitting } = this.props
    const classes = this.props.classes
    return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(this.onSubmit)}>
          <Field id='email' label='Email Address' name='email' type='email' component={this.renderField}/>
          <Field id='password' label='Password' name='password' type='password' component={this.renderField}/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={submitting}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <Link to='/signUp' variant="body2" >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    );
  }
}

// export default withStyles(loginStyles)(Login) ;

const mapStateToProps = state => ({ auth: state.auth })
// const mapDispatchToProps = ({ login })

export default withStyles(loginStyles)(connect(mapStateToProps, null)(
  reduxForm({
    form: 'loginForm'
  })(Login)
  ))