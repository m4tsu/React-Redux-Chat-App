import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

const headerStyle= theme =>( {
  appBarColorDefault: {
    backgroundColor: '#42b983'
  },
  toolbar: theme.mixins.toolbar
})

class Header extends Component {
  render() {
    // const classes = useStyles();
    return (
      <div>
        <AppBar position="fixed" classes={{colorPrimary: this.props.classes.appBarColorDefault}}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <div className={this.props.classes.toolbar}></div>
      </div>
    );
  }
}

export default withStyles(headerStyle)(Header)