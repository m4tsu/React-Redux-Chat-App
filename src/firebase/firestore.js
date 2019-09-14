import firebase from 'firebase'

import firebaseConfig from './firebaseConfig';

firebase.initializeApp(firebaseConfig);
// この3行を追記
export const fireStore = firebase.firestore()

export const messagesRef = fireStore.collection('messages')

export const usersRef = fireStore.collection('users')