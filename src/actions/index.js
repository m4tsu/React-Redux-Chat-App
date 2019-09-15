import * as actionTypes from './actionTypes'
import { messagesRef, usersRef } from '../firebase/firestore'
import firebase from 'firebase'

// Messages

const setMessage = snapshot => async dispatch => {
  for(let change of snapshot.docChanges()){
    if(change.type === 'added') {
      const messageDoc = change.doc;
      const author = await change.doc.data().userRef.get()
      const message = {
        id: messageDoc.id,
        userName: author.data().displayName,
        content: messageDoc.data().content,
        createdAt: messageDoc.data().createdAt,
      }
      dispatch({type: actionTypes.POST_MESSAGE, message: message});
      const root = document.getElementById('root');
      window.scrollTo(0, root.clientHeight);
    }
    if(change.type === 'removed') {
      const message = {
        id: change.doc.id
      }
      dispatch({type: actionTypes.DELETE_MESSAGE, message: message});
    }
  }
}

export const fetchMessages = () => dispatch => {
  messagesRef.orderBy('createdAt', 'asc').onSnapshot(snapshot  => {

    dispatch(setMessage(snapshot))
    // snapshot.docChanges().forEach( async change => {
    //   console.log(change.doc.data().userRef)
    //   let message ={}
    //   await change.doc.data().userRef.get()
    //   .then(user => {
    //     message = {
    //       id: change.doc.id,
    //       userName: user.data().displayName,
    //       content: change.doc.data().content,
    //       createdAt: change.doc.data().createdAt
    //     }
    //   })

    //   if (change.type === 'added') {
    //     dispatch({type: actionTypes.POST_MESSAGE, message: message});
    //     const root = document.getElementById('root');
    //     window.scrollTo(0, root.clientHeight);
    //   }
    //   if (change.type === 'removed') {
    //     dispatch({type: actionTypes.DELETE_MESSAGE, message: message});
    //   }
    // })
  })
}

// firesoter に保存する
export const postMessage = message => dispatch => {
  const appUser = usersRef.doc(message.uid)
  messagesRef.add({
    userRef: appUser,
    content: message.content,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  })
}
// firestore のmessage を削除する
export const deleteMessage = messageId => dispatch => {
  messagesRef.doc(messageId).delete()
  .then(() => {
    console.log('message deleted')
  })
}

// Messages

// User
export const fetchAuth = () => dispatch => {
  dispatch(authLoading)
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      const auth = {
        currentUser: {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
        },
        authenticated: true,
        loading: false,
      }
      dispatch(loginSuccess(auth));
    } else {
      dispatch(logoutSuccess());
    }
  });
}

export const updateUserName = (displayName) => dispatch => {
  dispatch({type: actionTypes.UPDATE_USERNAME, auth: {displayName: displayName}})
}

export const loginSuccess = auth =>dispatch => {
  dispatch({type: actionTypes.LOGIN_SUCCESS, auth: auth});
  // console.log('login success')
}

export const logoutSuccess = () => dispatch => {
  dispatch({type: actionTypes.LOGOUT_SUCCESS});
  // console.log('logout success')
}

export const authLoading = () => dispatch => {
  dispatch({type:actionTypes.AUTH_LOADING, auth: {loading: true}})
}
