import firebase from 'firebase';
import config from '../firebase/config.js';

firebase.initializeApp(config);

export const firebaseRef = firebase.database().ref();
export const tweetsRef = firebaseRef.child('tweets');
export const usersRef = firebaseRef.child('users');
