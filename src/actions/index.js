import * as actionTypes from './actionTypes'
import { messagesRef } from '../firebase/firestore'
import firebase from 'firebase'

// Messages

export const fetchMessages = () => dispatch => {
  messagesRef.orderBy('createdAt', 'asc').onSnapshot(snapshot  => {
    snapshot.docChanges().forEach( change => {
      let message = {
        id: change.doc.id,
        ...change.doc.data(),
      }
      if (change.type === 'added') {
        dispatch({type: actionTypes.POST_MESSAGE, message: message});
        const root = document.getElementById('root');
        window.scrollTo(0, root.clientHeight);
      }
      if (change.type === 'removed') {
        console.log('remove event not defind')
      }
    })
  })
}

// firesote に保存する
export const postMessage = message =>dispatch => {
  messagesRef.add({
    userId: parseInt(message.user),
    content: message.content,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  })
}

// Messages

// User
export const fetchAuth = () => dispatch => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      const auth = {
        currentUser: {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
        },
        authenticated: true,
      }
      dispatch(loginSuccess(auth));
    } else {
      dispatch(logoutSuccess());
    }
  });
}

export const loginSuccess = auth => dispatch => {
  console.log('login success')
  console.log(auth)
  dispatch({type: actionTypes.LOGIN_SUCCESS, auth: auth});
}

export const logoutSuccess = () => dispatch => {
  console.log('logout success')
  dispatch({type: actionTypes.LOGOUT_SUCCESS});
}

// User