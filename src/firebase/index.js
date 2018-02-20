import firebase from 'firebase';
import config from '../firebase/config.js';

firebase.initializeApp(config);

export const firebaseRef = firebase.database();
export const tweetsRef = firebaseRef.ref('tweets');
export const usersRef = firebaseRef.ref('users');
