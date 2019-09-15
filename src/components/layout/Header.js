import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const headerStyle= theme =>　({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar
})

class Header extends Component {
  constructor(props) {
    super(props)
    this.onSignoutClick = this.onSignoutClick.bind(this)
  }

  componentDidUpdate() {
    console.log(this.props.auth)
  }

  onSignoutClick() {
    this.logout();
  }

  logout(){
    firebase.auth().signOut()
    .then(() => {
      console.log('sign out success')
      this.props.history.push('/')
    }).catch( error => {
      console.log(error)
    })
  }

  render() {
    const classes = this.props.classes
    const auth = this.props.auth
    const authLink = auth => {
      if (!auth.authenticated) {
        return (
          <Link to='/login' style={{all: 'inherit'}} className={this.props.classes.link}>
            ログイン
          </Link>
        )
      } else {
        return (
          <Link to='/' onClick = { this.onSignoutClick } style={{all: 'inherit'}}>
            ログアウト
          </Link>
        )
      }
    }

    return (
      <div className={classes.root}>
        <AppBar position='fixed' >
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Link to='/' style={{all: 'inherit'}} className={classes.link}> <MenuIcon /> </Link>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              { !!auth.currentUser.displayName ? `${auth.currentUser.displayName}` : ''}
            </Typography>
            <nav>
              <Button color='inherit'><Link to='/chat' style={{all: 'inherit'}} className={classes.link}>チャット</Link></Button>
              <Button color="inherit">{authLink(auth)}</Button>
            </nav>
          </Toolbar>
        </AppBar>
        <div className={classes.toolbar}></div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ auth: state.auth })
// const mapDispatchToProps = ({logout})

export default withStyles(headerStyle)(connect(mapStateToProps, null)(Header))
