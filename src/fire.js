const firebase = require("firebase");
require("firebase/firestore");

var config = {
  apiKey: "AIzaSyCiMuINxaok3OuBoaVN8h4Fu6ioa72MvUM",
  authDomain: "wurf-82264.firebaseapp.com",
  databaseURL: "https://wurf-82264.firebaseio.com",
  projectId: "wurf-82264",
  storageBucket: "wurf-82264.appspot.com",
  messagingSenderId: "573969861553"
};

const fire = firebase.initializeApp(config);
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
export default fire;
