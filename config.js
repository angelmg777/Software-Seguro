import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyAPcoBxikTQJy9-umUW6V8pBcTLBAPBupk",
  authDomain: "desarrollo-de-software-s-62291.firebaseapp.com",
  projectId: "desarrollo-de-software-s-62291",
  storageBucket: "desarrollo-de-software-s-62291.appspot.com",
  messagingSenderId: "749545516137",
  appId: "1:749545516137:web:2f83c376359361583cc6f8",
  measurementId: "G-NNVWW0QFR4"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();
// Agrega la configuración experimentalAutoDetectLongPolling
firestore.settings({
  experimentalAutoDetectLongPolling: true
});

export { firebase };
