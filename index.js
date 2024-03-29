// Import stylesheets
import './style.css';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import * as firebaseui from 'firebaseui';

// Document elements
const startRsvpButton = document.getElementById('startRsvp');
const guestbookContainer = document.getElementById('guestbook-container');

const form = document.getElementById('leave-message');
const input = document.getElementById('message');
const guestbook = document.getElementById('guestbook');
const numberAttending = document.getElementById('number-attending');
const rsvpYes = document.getElementById('rsvp-yes');
const rsvpNo = document.getElementById('rsvp-no');

var rsvpListener = null;
var guestbookListener = null;

// Add Firebase project configuration object here
var firebaseConfig = {
  apiKey: "AIzaSyAVgDS77cDBkcxph3ktuvk6bnlrh7KbHuw",
  authDomain: "movie-funnies.firebaseapp.com",
  databaseURL: "https://movie-funnies.firebaseio.com",
  projectId: "movie-funnies",
  storageBucket: "movie-funnies.appspot.com",
  messagingSenderId: "504791662715",
  appId: "1:504791662715:web:610eedcc1685a4c13422de"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// firebase.initializeApp(firebaseConfig);

// FirebaseUI config
const uiConfig = {
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  signInOptions: [
    // Email / Password Provider.
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl){
      // Handle sign-in.
      // Return false to avoid redirect.
      return false;
    }
  }
};

const ui = new firebaseui.auth.AuthUI(firebase.auth());

startRsvpButton.addEventListener("click",
  () => {
    if (firebase.auth().currentUser) {
      firebase.auth().signOut();
    }
    else {
    ui.start("#firebaseui-auth-container", uiConfig);
  }
  }
);


firebase.auth().onAuthStateChanged((user)=> {
  if (user) {
      startRsvpButton.textContent = "Logout"
  }

  else {
    startRsvpButton.textContent = "RSVP"
  }

})