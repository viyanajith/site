// Shared Firebase setup for the account pages.
//
// NOTE: The apiKey below is a Firebase *Web* key. Per Google's official
// docs it is NOT a secret — it only identifies the project and is meant
// to ship in public client-side code. Data is protected by Firestore
// Security Rules, not by hiding this key. (GitHub's scanner flags any
// "AIza..." string generically; for Firebase web keys this is a known
// false positive.)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAxUAsuXmyvZuKDoZxGgoBNB9e6K26kyqc",
  authDomain: "my-site-f55c8.firebaseapp.com",
  projectId: "my-site-f55c8",
  storageBucket: "my-site-f55c8.firebasestorage.app",
  messagingSenderId: "57817638502",
  appId: "1:57817638502:web:c7eccb73195061c0bcefa7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Scratch-style login: the user only ever types a username.
// Firebase needs an email, so we turn the username into one internally.
export function usernameToEmail(username) {
  return username.trim().toLowerCase() + "@viyan-users.app";
}

// Allowed usernames: 3-20 chars, letters / numbers / underscore only.
export const USERNAME_RE = /^[a-zA-Z0-9_]{3,20}$/;
