import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
  apiKey: 'AIzaSyBIKYKNhuPR9ANs53rL6Ld11gWmtc5JjRc',
  authDomain: 'todo-list-c91c7.firebaseapp.com',
  databaseURL: 'https://todo-list-c91c7.firebaseio.com',
  projectId: 'todo-list-c91c7',
  storageBucket: 'todo-list-c91c7.appspot.com',
  messagingSenderId: '570985103327',
  appId: '1:570985103327:web:fe5b650a229f76e5478e6a',
});

export { firebaseConfig as firebase };
