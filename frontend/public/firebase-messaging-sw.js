/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyBrqfZ6vWYgPLZi07yCUH-r7qBhAZ9h32k",
  authDomain: "cinemax-2e7c7.firebaseapp.com",
  projectId: "cinemax-2e7c7",
  storageBucket: "cinemax-2e7c7.firebasestorage.app",
  messagingSenderId: "9306587746",
  appId: "1:9306587746:web:de25183fc9de2770fd473b",
  measurementId: "G-7HL4PY1E6K",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(notificationTitle, notificationOptions);
});
