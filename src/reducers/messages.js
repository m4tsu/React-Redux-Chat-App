import * as actionTypes from '../actions/actionTypes'

const initialMessages = [
  {
    id: 1,
    user:'sample_user',
    content: 'sample_content',
  },
  {
    id: 2,
    user:'test_user',
    content: 'test_content',
  },
]

const messages = (messages = initialMessages, action) => {
  switch(action.type) {
    case actionTypes.READ_MESSAGES:
      return (
        [
          ...messages
        ]
      )
    case actionTypes.POST_MESSAGE:
      return (
        [
          ...messages,
          {
            id: messages.length + 1,
            user: action.user,
            content: action.content,
          }
        ]
      )
    default:
      return (messages)
  }
}

export default messages;