import firebase from 'firebase/app';

//servicio de firebase
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAuN9ZVdHAw10hlHb0e2Mx-370I6I9ygBw",
    authDomain: "crud-react-5e1d5.firebaseapp.com",
    projectId: "crud-react-5e1d5",
    storageBucket: "crud-react-5e1d5.appspot.com",
    messagingSenderId: "454855245781",
    appId: "1:454855245781:web:45c1919befccd7baee075c"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export {firebase}