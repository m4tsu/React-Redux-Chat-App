import * as actionTypes from '../actions/actionTypes'
import lodash from 'lodash'

const messages = (messages = {}, action) => {
  switch(action.type) {
    case actionTypes.POST_MESSAGE:
      return (
        {
          ...messages,
          [action.message.id]: {
            id: action.message.id,
            userId: action.message.userId,
            content: action.message.content,
            createdAt: action.message.createdAt,
          }
        }
      )
    default:
      return (messages)
  }
}

export default messages;