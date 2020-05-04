var firebase = require("firebase/app");
require("firebase/database")
var firebaseConfig = {
  apiKey: "AIzaSyAjDmTioXI7TLNOk27o_MQeyzxFlyJ4pjk",
  authDomain: "test-smoke-n-grill.firebaseapp.com",
  databaseURL: "https://test-smoke-n-grill.firebaseio.com",
  projectId: "test-smoke-n-grill",
  storageBucket: "test-smoke-n-grill.appspot.com",
  messagingSenderId: "494310442168",
  appId: "1:494310442168:web:dfd2af7c1483131d72204d",
  measurementId: "G-91MCT3GG38"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


module.exports = firebase