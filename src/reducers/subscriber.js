import * as actionTypes from '../actions/actionTypes'

const subscribe = (subscribe = null, action) => {
  switch(action.type) {
    case actionTypes.SUBSCRIBE:
      return (action.unsubscribe)
    default:
      return (subscribe)
  }
}

export default subscribe;