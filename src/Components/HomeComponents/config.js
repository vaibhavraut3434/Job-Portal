import firebase from 'firebase';
import 'firebase/auth';

var firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyCuhpiwU95SqxxfixVVcbVT44id4jgYylI",
    authDomain: "job-portal-e6b5e.firebaseapp.com",
    projectId: "job-portal-e6b5e",
    storageBucket: "job-portal-e6b5e.appspot.com",
    messagingSenderId: "714896683993",
    appId: "1:714896683993:web:0a7c0af011be240f57dfc8"
  });
  
export default firebaseConfig;