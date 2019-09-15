import * as actionTypes from '../actions/actionTypes'
import lodash from 'lodash'

const messages = (messages = {}, action) => {
  switch(action.type) {
    case actionTypes.POST_MESSAGE:
      return (
        {
          ...messages,
          [action.message.id]: {
            ...action.message
          }
        }
      )
    case actionTypes.DELETE_MESSAGE:
      delete messages[action.message.id]
      return (
        {
          ...messages
        }
      )
    default:
      return (messages)
  }
}

export default messages;