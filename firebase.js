import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { getAuth }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getStorage }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {
apiKey: "AIzaSyDirvt1MHgVnNRuDP1UvJEa5Pvbq4Cgvow",
authDomain: "reklama-4815d.firebaseapp.com",
projectId: "reklama-4815d",
storageBucket: "reklama-4815d.firebasestorage.app",
messagingSenderId: "177950086027",
appId: "1:177950086027:web:97297773a760771eaf558e",
measurementId: "G-1FRL8BFYY8"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export const storage = getStorage(app);
