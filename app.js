```javascript
import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const adsContainer =
document.getElementById("adsContainer");

let allAds = [];

/* REKLAMALARY ÝÜKLE */

async function loadAds() {

    try {

        adsContainer.innerHTML =
        "<h2>Yükleniyor...</h2>";

        const querySnapshot =
        await getDocs(
            collection(db, "ads")
        );

        allAds = [];

        querySnapshot.forEach((doc) => {

            allAds.push({
                id: doc.id,
                ...doc.data()
            });

        });

        renderAds(allAds);

    }

    catch(error){

        console.error(error);

        adsContainer.innerHTML =
        "<h2>Veriler alınamadı</h2>";

    }

}

/* REKLAMALARY ÇYKAR */

function renderAds(ads){

    adsContainer.innerHTML = "";

    if(ads.length === 0){

        adsContainer.innerHTML =
        "<h2>İlan bulunamadı</h2>";

        return;
    }

    ads.forEach(ad => {

        const card =
        document.createElement("div");

        card.className =
        "ad-card";

        card.innerHTML = `

        <img
        src="${
            ad.image ||
            'images/1.jpg'
        }"
        alt="${ad.title}"
        style="
            width:100%;
            height:300px;
            object-fit:contain;
            background:#fff;
            display:block;
        ">

        <div class="ad-content">

            <div class="ad-title">
                ${ad.title || ""}
            </div>

            <div class="ad-description">
                ${ad.description || ""}
            </div>

            <div class="ad-price">
                ${ad.price || "0"} ₺
            </div>

            <br>

            <p>
                <strong>Kategori:</strong>
                ${ad.category || "Diğer"}
            </p>

            <p>
                <strong>Telefon:</strong>
                ${ad.phone || "-"}
            </p>

            <p>
                <strong>WhatsApp:</strong>
                ${ad.whatsapp || "-"}
            </p>

            <p>
                <strong>Konum:</strong>
                ${ad.location || "-"}
            </p>

            <p>
                <strong>Cinsiyet:</strong>
                ${ad.gender || "-"}
            </p>

            <p>
                <strong>Yaş:</strong>
                ${ad.age || "-"}
            </p>

        </div>

        `;

        adsContainer.appendChild(card);

    });

}

/* GÖZLEG */

const searchInput =
document.querySelector(
".search-box input"
);

if(searchInput){

    searchInput.addEventListener(
        "input",
        function(){

            const value =
            this.value.toLowerCase();

            const filtered =
            allAds.filter(ad => {

                return (

                    ad.title
                    ?.toLowerCase()
                    .includes(value)

                    ||

                    ad.description
                    ?.toLowerCase()
                    .includes(value)

                    ||

                    ad.phone
                    ?.toLowerCase()
                    .includes(value)

                    ||

                    ad.location
                    ?.toLowerCase()
                    .includes(value)

                );

            });

            renderAds(filtered);

        }
    );

}

/* SAHYPA AÇYLANDA */

loadAds();
```
