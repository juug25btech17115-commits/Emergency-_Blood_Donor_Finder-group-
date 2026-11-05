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
