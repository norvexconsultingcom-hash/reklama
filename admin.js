import { db } from "./firebase.js";

import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* Firebase App */
const firebaseConfig = {
  apiKey: "AIzaSyCt7qbiFuXn2CiNYPnjw4rzH2yXTqOBHv8",
  authDomain: "reklama-23050.firebaseapp.com",
  projectId: "reklama-23050",
  storageBucket: "reklama-23050.firebasestorage.app",
  messagingSenderId: "560010328420",
  appId: "1:560010328420:web:36adf255502a21839d6271"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* ELEMENTLER */

const loginBtn =
document.getElementById("loginBtn");

const logoutBtn =
document.getElementById("logoutBtn");

const loginSection =
document.getElementById("loginSection");

const adminPanel =
document.getElementById("adminPanel");

const adminAdsSection =
document.getElementById("adminAdsSection");

const addAdBtn =
document.getElementById("addAdBtn");

const adminAds =
document.getElementById("adminAds");

/* LOGIN */

loginBtn.addEventListener(
"click",
async () => {

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    try {

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        alert("Giriş başarılı");

    }

    catch(error){

        alert(error.message);

    }

});

/* AUTH CONTROL */

onAuthStateChanged(
auth,
(user)=>{

    if(user){

        loginSection.style.display =
        "none";

        adminPanel.style.display =
        "block";

        adminAdsSection.style.display =
        "block";

        loadAds();

    }
    else{

        loginSection.style.display =
        "block";

        adminPanel.style.display =
        "none";

        adminAdsSection.style.display =
        "none";

    }

}
);

/* LOGOUT */

logoutBtn.addEventListener(
"click",
async()=>{

    await signOut(auth);

});
/* REKLAMA GOŞ */

addAdBtn.addEventListener(
"click",
async()=>{

    const title =
    document.getElementById("title").value;

    const description =
    document.getElementById("description").value;

    const price =
    document.getElementById("price").value;

    const image =
    document.getElementById("image").value;

    const category =
    document.getElementById("category").value;

    try{

        await addDoc(
            collection(db,"ads"),
            {
                title,
                description,
                price,
                image,
                category,
                createdAt:
                Date.now()
            }
        );

        alert("İlan eklendi");

        loadAds();

    }
    catch(error){

        alert(error.message);

    }

});

/* REKLAMALARY ÝÜKLE */

async function loadAds(){

    adminAds.innerHTML = "";

    const querySnapshot =
    await getDocs(
        collection(db,"ads")
    );

    querySnapshot.forEach(docSnap=>{

        const ad =
        docSnap.data();

        const card =
        document.createElement("div");

        card.className =
        "ad-card";

        card.innerHTML = `

        <img
        src="${ad.image}"
        style="
        width:100%;
        height:200px;
        object-fit:cover;
        ">

        <div class="ad-content">

            <h3>
            ${ad.title}
            </h3>

            <p>
            ${ad.description}
            </p>

            <h4>
            ${ad.price} ₺
            </h4>

            <p>
            ${ad.category}
            </p>

            <button
            onclick="deleteAd('${docSnap.id}')">

            Sil

            </button>

        </div>

        `;

        adminAds.appendChild(card);

    });

}

/* REKLAMA POZ */

window.deleteAd =
async function(id){

    const result =
    confirm(
    "Bu ilan silinsin mi?"
    );

    if(!result) return;

    await deleteDoc(
        doc(db,"ads",id)
    );

    loadAds();

}