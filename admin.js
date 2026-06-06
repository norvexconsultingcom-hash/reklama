import { db, auth } from "./firebase.js";

import {
signInWithEmailAndPassword,
signOut,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
collection,
addDoc,
getDocs,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ELEMENTLER */

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

const loginSection = document.getElementById("loginSection");
const adminPanel = document.getElementById("adminPanel");
const adminAdsSection = document.getElementById("adminAdsSection");

const addAdBtn = document.getElementById("addAdBtn");
const adminAds = document.getElementById("adminAds");

/* LOGIN */

loginBtn.addEventListener("click", async () => {
const email = document.getElementById("email").value.trim();
const password = document.getElementById("password").value;

try {
await signInWithEmailAndPassword(
auth,
email,
password
);

```
alert("Giriş başarılı");
```

} catch (error) {
alert(error.message);
}
});

/* AUTH CONTROL */

onAuthStateChanged(auth, (user) => {

if (user) {

```
loginSection.style.display = "none";
adminPanel.style.display = "block";
adminAdsSection.style.display = "block";

loadAds();
```

} else {

```
loginSection.style.display = "block";
adminPanel.style.display = "none";
adminAdsSection.style.display = "none";
```

}

});

/* LOGOUT */

logoutBtn.addEventListener("click", async () => {

try {

```
await signOut(auth);
```

} catch (error) {

```
alert(error.message);
```

}

});

/* REKLAMA GOŞ */

addAdBtn.addEventListener("click", async () => {

const title = document.getElementById("title").value.trim();
const description = document.getElementById("description").value.trim();
const price = document.getElementById("price").value;
const image = document.getElementById("image").value.trim();
const category = document.getElementById("category").value;

if (!title || !description) {
alert("Başlık ve açıklama gerekli");
return;
}

try {

```
await addDoc(
  collection(db, "ads"),
  {
    title,
    description,
    price,
    image,
    category,
    createdAt: Date.now()
  }
);

alert("İlan eklendi");

document.getElementById("title").value = "";
document.getElementById("description").value = "";
document.getElementById("price").value = "";
document.getElementById("image").value = "";

loadAds();
```

} catch (error) {

```
alert(error.message);
```

}

});

/* REKLAMALARY ÝÜKLE */

async function loadAds() {

adminAds.innerHTML = "";

try {

```
const querySnapshot = await getDocs(
  collection(db, "ads")
);

querySnapshot.forEach((docSnap) => {

  const ad = docSnap.data();

  const card = document.createElement("div");

  card.className = "ad-card";

  card.innerHTML = `
    <img
      src="${ad.image || 'https://via.placeholder.com/500x300'}"
      alt="${ad.title}"
      style="
        width:100%;
        height:200px;
        object-fit:cover;
      "
    >

    <div class="ad-content">

      <h3>${ad.title}</h3>

      <p>${ad.description}</p>

      <h4>${ad.price || 0} ₺</h4>

      <p>${ad.category}</p>

      <button
        onclick="deleteAd('${docSnap.id}')"
      >
        Sil
      </button>

    </div>
  `;

  adminAds.appendChild(card);

});
```

} catch (error) {

```
console.error(error);
```

}

}

/* REKLAMA POZ */

window.deleteAd = async function(id) {

const result = confirm(
"Bu ilan silinsin mi?"
);

if (!result) return;

try {

```
await deleteDoc(
  doc(db, "ads", id)
);

loadAds();
```

} catch (error) {

```
alert(error.message);
```

}

};
