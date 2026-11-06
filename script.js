import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCgRXM8NUZJRUb1KPPaDk8t8upo7S_RErGA",
    authDomain: "emergency-blood-donor-fi-214a7.firebaseapp.com",
    projectId: "emergency-blood-donor-fi-214a7",
    storageBucket: "emergency-blood-donor-fi-214a7.firebasestorage.app",
    messagingSenderId: "1072848220913",
    appId: "1:1072848220913:web:b9e9391e87a1f5ee616f50",
    measurementId: "G-334Z4P8S7E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// HTML elements
const donorForm = document.getElementById("donorForm");
const registerMessage = document.getElementById("registerMessage");

const searchButton = document.getElementById("searchButton");
const searchBlood = document.getElementById("searchBlood");
const searchCity = document.getElementById("searchCity");
const results = document.getElementById("results");

// Register donor in Firebase
donorForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const donor = {
        name: document.getElementById("name").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        bloodGroup: document.getElementById("bloodGroup").value.trim(),
        city: document.getElementById("city").value.trim(),
        availability: document.getElementById("availability").value.trim()
    };

    const consent = document.getElementById("consent").checked;

    if (!consent) {
        registerMessage.textContent =
            "Please agree to share your details.";
        return;
    }

    if (Object.values(donor).some(value => !value)) {
        registerMessage.textContent =
            "Please fill all the fields.";
        return;
    }

    try {
        await addDoc(collection(db, "donors"), donor);

        registerMessage.textContent =
            "Donor registered successfully!";

        donorForm.reset();

    } catch (error) {
        console.error("Firebase error:", error);
        registerMessage.textContent =
            "Registration failed. Please try again.";
    }
});

// Search donors from Firebase
searchButton.addEventListener("click", async function() {

    const selectedBlood = searchBlood.value.trim().toUpperCase();
    const selectedCity = searchCity.value.trim().toLowerCase();

    results.innerHTML = "";

    if (!selectedBlood || !selectedCity) {
        results.textContent = "Please select blood group and enter city.";
        return;
    }

    try {
        const snapshot = await getDocs(collection(db, "donors"));
        const matchingDonors = [];

        snapshot.forEach((doc) => {
            const donor = doc.data();

            const bloodGroup = String(
                donor.bloodGroup || donor.blood_group || donor.Bloodgroup || ""
            ).trim().toUpperCase();

            const city = String(donor.city || "").trim().toLowerCase();

            const availability = String(
                donor.availability || ""
            ).trim().toLowerCase();

            if (
                bloodGroup === selectedBlood &&
                city === selectedCity &&
                availability === "available"
            ) {
                matchingDonors.push(donor);
            }
        });

        if (matchingDonors.length === 0) {
            results.textContent = "No matching donors found.";
            return;
        }

        matchingDonors.forEach(donor => {
            const card = document.createElement("div");
            card.className = "donor-card";

            const name = document.createElement("h3");
            name.textContent = donor.name;

            const blood = document.createElement("p");
            blood.textContent = "Blood Group: " +
                (donor.bloodGroup || donor.blood_group || donor.Bloodgroup);

            const city = document.createElement("p");
            city.textContent = "City: " + donor.city;

            const availability = document.createElement("p");
            availability.textContent = "Availability: " + donor.availability;

            const contact = document.createElement("a");
            contact.href = "tel:" + donor.phone;
            contact.textContent = "Contact Donor";

            card.appendChild(name);
            card.appendChild(blood);
            card.appendChild(city);
            card.appendChild(availability);
            card.appendChild(contact);

            results.appendChild(card);
        });

    } catch (error) {
        console.error("Search error:", error);
        results.textContent = "Unable to search donors. Please try again.";
    }
});
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCgRXM8NUZJRUb1KPPaDk8t8upo7S_RErGA",
    authDomain: "emergency-blood-donor-fi-214a7.firebaseapp.com",
    projectId: "emergency-blood-donor-fi-214a7",
    storageBucket: "emergency-blood-donor-fi-214a7.firebasestorage.app",
    messagingSenderId: "1072848220913",
    appId: "1:1072848220913:web:b9e9391e87a1f5ee616f50",
    measurementId: "G-334Z4P8S7E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// HTML elements
const donorForm = document.getElementById("donorForm");
const registerMessage = document.getElementById("registerMessage");

const searchButton = document.getElementById("searchButton");
const searchBlood = document.getElementById("searchBlood");
const searchCity = document.getElementById("searchCity");
const results = document.getElementById("results");

// Register donor in Firebase
donorForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const donor = {
        name: document.getElementById("name").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        bloodGroup: document.getElementById("bloodGroup").value.trim(),
        city: document.getElementById("city").value.trim(),
        availability: document.getElementById("availability").value.trim()
    };

    const consent = document.getElementById("consent").checked;

    if (!consent) {
        registerMessage.textContent =
            "Please agree to share your details.";
        return;
    }

    if (Object.values(donor).some(value => !value)) {
        registerMessage.textContent =
            "Please fill all the fields.";
        return;
    }

    try {
        await addDoc(collection(db, "donors"), donor);

        registerMessage.textContent =
            "Donor registered successfully!";

        donorForm.reset();

    } catch (error) {
        console.error("Firebase error:", error);
        registerMessage.textContent =
            "Registration failed. Please try again.";
    }
});

// Search donors from Firebase
searchButton.addEventListener("click", async function() {

    const selectedBlood =
        searchBlood.value.trim().toUpperCase();

    const selectedCity =
        searchCity.value.trim().toLowerCase();

    results.innerHTML = "";

    if (!selectedBlood || !selectedCity) {
        results.textContent =
            "Please select blood group and enter city.";
        return;
    }

    try {
        const snapshot = await getDocs(collection(db, "donors"));

        const matchingDonors = [];

        snapshot.forEach((doc) => {
            const donor = doc.data();

            if (
                donor.bloodGroup.trim().toUpperCase() === selectedBlood &&
                donor.city.trim().toLowerCase() === selectedCity &&
                donor.availability.toLowerCase() === "available"
            ) {
                matchingDonors.push(donor);
            }
        });

        if (matchingDonors.length === 0) {
            results.textContent = "No matching donors found.";
            return;
        }

        matchingDonors.forEach(donor => {

            const card = document.createElement("div");
            card.className = "donor-card";

            const name = document.createElement("h3");
            name.textContent = donor.name;

            const blood = document.createElement("p");
            blood.textContent = "Blood Group: " + donor.bloodGroup;

            const city = document.createElement("p");
            city.textContent = "City: " + donor.city;

            const availability = document.createElement("p");
            availability.textContent =
                "Availability: " + donor.availability;

            const contact = document.createElement("a");
            contact.href = "tel:" + donor.phone;
            contact.textContent = "Contact Donor";

            card.appendChild(name);
            card.appendChild(blood);
            card.appendChild(city);
            card.appendChild(availability);
            card.appendChild(contact);

            results.appendChild(card);
        });

    } catch (error) {
        console.error("Search error:", error);
        results.textContent =
            "Unable to search donors. Please try again.";
    }
});
const donorForm = document.getElementById("donorForm");
const registerMessage = document.getElementById("registerMessage");

const searchButton = document.getElementById("searchButton");
const searchBlood = document.getElementById("searchBlood");
const searchCity = document.getElementById("searchCity");
const results = document.getElementById("results");

// Get saved donors
function getDonors() {
    return JSON.parse(localStorage.getItem("donors")) || [];
}

// Register donor
donorForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const donor = {
        name: document.getElementById("name").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        bloodGroup: document.getElementById("bloodGroup").value.trim(),
        city: document.getElementById("city").value.trim(),
        availability: document.getElementById("availability").value.trim()
    };

    const consent = document.getElementById("consent").checked;

    if (!consent) {
        registerMessage.textContent =
            "Please agree to share your details.";
        return;
    }

    if (Object.values(donor).some(value => !value)) {
        registerMessage.textContent =
            "Please fill all the fields.";
        return;
    }

    const donors = getDonors();
    donors.push(donor);

    localStorage.setItem("donors", JSON.stringify(donors));

    registerMessage.textContent =
        "Donor registered successfully!";

    donorForm.reset();
});

// Search donors
searchButton.addEventListener("click", function() {

    const selectedBlood = searchBlood.value.trim().toUpperCase();
    const selectedCity = searchCity.value.trim().toLowerCase();

    const donors = getDonors();

    results.innerHTML = "";

    if (!selectedBlood || !selectedCity) {
        results.textContent =
            "Please select blood group and enter city.";
        return;
    }

    const matchingDonors = donors.filter(donor => {

        return donor.bloodGroup.trim().toUpperCase() === selectedBlood &&
        donor.city.trim().toLowerCase() === selectedCity &&
        donor.availability.toLowerCase() === "available";

    });

    if (matchingDonors.length === 0) {
        results.textContent = "No matching donors found.";
        return;
    }

    matchingDonors.forEach(donor => {

        const card = document.createElement("div");
        card.className = "donor-card";

        card.innerHTML = `
            <h3>${donor.name}</h3>
            <p>Blood Group: ${donor.bloodGroup}</p>
            <p>City: ${donor.city}</p>
            <p>Availability: ${donor.availability}</p>
        `;

        const contact = document.createElement("a");
        contact.href = "tel:" + donor.phone;
        contact.textContent = "Contact Donor";

        card.appendChild(contact);
        results.appendChild(card);

    });
});// Get the donor registration form
