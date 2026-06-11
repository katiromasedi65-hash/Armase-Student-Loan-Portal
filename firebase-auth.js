import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail, signOut } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCQCgi0mYzD5NxWJBLfizV2m9QaP_GbcS4",
  authDomain: "armase-portal-1a383.firebaseapp.com",
  projectId: "armase-portal-1a383",
  storageBucket: "armase-portal-1a383.firebasestorage.app",
  messagingSenderId: "424434833089",
  appId: "1:424434833089:web:dd4ff2197e96247a1a2640",
  measurementId: "G-EWXRQG9SQK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

window.submitLogin = function() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      sessionStorage.setItem('loggedIn', 'true');
      window.location.href = 'loan application.html';
    })
    .catch(err => { alert('Login failed: ' + err.message); });
}

window.submitRegister = function() {
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      sessionStorage.setItem('loggedIn', 'true');
      window.location.href = 'loan application.html';
    })
    .catch(err => { alert('Registration failed: ' + err.message); });
}

window.googleLogin = function() {
  signInWithPopup(auth, provider)
    .then(() => {
      sessionStorage.setItem('loggedIn', 'true');
      window.location.href = 'loan application.html';
    })
    .catch(err => { alert('Google login failed: ' + err.message); });
}

window.forgotPassword = function() {
  const email = document.getElementById('loginEmail').value;
  if (!email) { alert('Please enter your email first!'); return; }
  sendPasswordResetEmail(auth, email)
    .then(() => { alert('Password reset email sent! Check your inbox.'); })
    .catch(err => { alert('Error: ' + err.message); });
}

window.logoutUser = function() {
  sessionStorage.removeItem('loggedIn');
  signOut(auth).then(() => { window.location.href = 'index.html'; });
}

window.checkAuth = function() {
  if (!sessionStorage.getItem('loggedIn')) {
    window.location.href = 'index.html';
  }
}