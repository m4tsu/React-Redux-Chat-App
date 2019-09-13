import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import  messages  from './messages'
import auth from './auth'


export default combineReducers({
  form: reduxFormReducer,
  messages: messages,
  auth: auth,
});