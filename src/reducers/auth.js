import * as actionTypes from '../actions/actionTypes'

const initialAuth = {
  currentUser: {
    uid: null,
    email: null,
    displayName: null,
  },
  authenticated: false,
  loading: true
}

const auth = (auth = initialAuth, action) => {
  switch(action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return ( action.auth )
    case actionTypes.UPDATE_USERNAME:
      const next = {...auth}
      next.currentUser.displayName = action.auth.displayName
      return (
        next
      )
    case actionTypes.LOGOUT_SUCCESS:
      return (
        {
          currentUser: {
            uid: null,
            email: null,
            displayName: null,
          },
          authenticated: false,
          loading: false
        })
    case actionTypes.AUTH_LOADING:
      return (
        {
          ...auth,
          loading: action.auth.loading
        }
      )
    default:
      return (auth)
  }
}

export default auth;