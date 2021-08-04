import firebase from "firebase";
import 'firebase/auth';

const app =  firebase.initializeApp({
  apiKey: "AIzaSyCAumRqpXrIgRIh3mzzbUBA17nsZlhvpT8",
  authDomain: "nerdlog-auth.firebaseapp.com",
  projectId: "nerdlog-auth",
  storageBucket: "nerdlog-auth.appspot.com",
  messagingSenderId: "235901031845",
  appId: "1:235901031845:web:7fd84e72d2a5435f14444c"
});

export default app;
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const githubAuthProvider = new firebase.auth.GithubAuthProvider();