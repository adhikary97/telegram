import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDEdWdX8R_5HItbMgo--Ez0A1fOBXrG-Mk',
  authDomain: 'telegram-clone-97494.firebaseapp.com',
  databaseURL: 'https://telegram-clone-97494.firebaseio.com',
  projectId: 'telegram-clone-97494',
  storageBucket: 'telegram-clone-97494.appspot.com',
  messagingSenderId: '514987536230',
  appId: '1:514987536230:web:4cdf7239105bb0ff3de2a7',
  measurementId: 'G-C4TR2J3LB9',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
