import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.scss';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import firebase from 'firebase'
import { Link } from 'react-router-dom'
import {MuiThemeProvider} from '@material-ui/core/styles';
import {muiTheme} from '../muiTheme';

import PrivateRoute from '../components/layout/PrivateRoute'
import Home from './Home';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import ChatRoom from './ChatRoom';

import Header from '../components/layout/Header'

import { fetchAuth } from '../actions/index'

class App extends Component {
  componentWillMount() {
    this.props.fetchAuth();
  }

  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={muiTheme}>
          <Header/>
          <Switch>
            <Route exact path='/' component={Home} />
            <PrivateRoute path='/chat' component={ChatRoom} />
            <Route path='/login' component={Login}/>
            <Route path='/signup' component={SignUp} />
          </Switch>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}


const mapStateToProps = state => ({ auth: state.auth})
const mapDispatchToProps = ({ fetchAuth })

export default connect(mapStateToProps, mapDispatchToProps)(App)