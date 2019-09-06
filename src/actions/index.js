import * as actionTypes from './actionTypes'

export const readMessages = () => ({
  type: actionTypes.READ_MESSAGES,
})

export const postMessage = message => ({
  type: actionTypes.POST_MESSAGE,
  user: message.user,
  content: message.content
})