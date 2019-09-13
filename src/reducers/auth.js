import * as actionTypes from '../actions/actionTypes'

const initialAuth = {
  currentUser: {
    uid: null,
    email: null,
    displayName: null,
  },
  authenticated: false
}

const auth = (auth = initialAuth, action) => {
  switch(action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return ( action.auth )
    case actionTypes.LOGOUT_SUCCESS:
      return (
        {
          currentUser: {
            uid: null,
            email: null,
            displayName: null,
          },
          authenticated: false
        })
    default:
      return (auth)
  }
}

export default auth;