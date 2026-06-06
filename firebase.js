import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { getAuth }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCt7qbiFuXn2CiNYPnjw4rzH2yXTqOBHv8",
  authDomain: "reklama-23050.firebaseapp.com",
  projectId: "reklama-23050",
  storageBucket: "reklama-23050.firebasestorage.app",
  messagingSenderId: "560010328420",
  appId: "1:560010328420:web:36adf255502a21839d6271"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);