importScripts("https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyBPI_9mPPc3rY-vk-VANAqYWPy6ceAM95o",
  authDomain: "typescript-template.firebaseapp.com",
  projectId: "typescript-template",
  storageBucket: "typescript-template.appspot.com",
  messagingSenderId: "502483510836",
  appId: "1:502483510836:web:358a2f99062a6591fa8c61",
  measurementId: "G-QNL7EL2X31",
};
firebase.initializeApp(firebaseConfig);

if (firebase.messaging.isSupported()) {
  const messaging = firebase.messaging();
  messaging.onBackgroundMessage();
}
