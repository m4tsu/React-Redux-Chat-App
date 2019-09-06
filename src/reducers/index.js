import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import  messages  from './messages'

export default combineReducers({
  form: reduxFormReducer,
  messages: messages
});