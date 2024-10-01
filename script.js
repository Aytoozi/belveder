document.addEventListener("DOMContentLoaded", function () {
	window.addEventListener("scroll", function () {
		var navSection = document.getElementById("navSection");
		var logo = document.getElementById("belvederLogo");
		var navBar = document.getElementById("navBar");

		// Check if the screen width is 768px or less
		if (window.innerWidth <= 768) {
			if (window.scrollY > 50) {
				navBar.style.visibility = "visible";
				logo.style.width = "35vw"; // Larger logo size for mobile when scrolling
				navSection.style.backgroundColor = "rgb(70, 130, 180)";
			} else {
				navBar.style.visibility = "hidden";
				logo.style.width = "60vw"; // Default larger size for mobile
				navSection.style.backgroundColor = "transparent";
			}
		} else {
			// For larger screens
			if (window.scrollY > 50) {
				navBar.style.visibility = "visible";
				logo.style.width = "15vw";
				navSection.style.backgroundColor = "rgb(70, 130, 180)";
			} else {
				navBar.style.visibility = "hidden";
				logo.style.width = "20vw";
				navSection.style.backgroundColor = "transparent";
			}
		}
	});
});

let translations = {};

// Fetch translations from the external JSON file
function loadTranslations() {
	return fetch("translations.json")
		.then((response) => response.json())
		.then((data) => {
			translations = data; // Assign the fetched translations
		})
		.catch((error) => console.error("Error loading translations:", error));
}

function switchLanguage(language) {
	// Store the selected language in localStorage
	localStorage.setItem("selectedLanguage", language);

	// Call the function to update the page content
	updateLanguage(language);
}

// Function to update text based on selected language
function updateLanguage(language) {
	const elements = document.querySelectorAll("[data-translate]");

	elements.forEach((element) => {
		const translationKey = element.getAttribute("data-translate");
		if (translations[language] && translations[language][translationKey]) {
			element.innerText = translations[language][translationKey];
		}
	});
}

// Event listeners for language switcher buttons
document.getElementById("en-button").addEventListener("click", () => {
	switchLanguage("en");
});

document.getElementById("hr-button").addEventListener("click", () => {
	switchLanguage("hr");
});

// On page load, fetch the translations and set the language based on localStorage
document.addEventListener("DOMContentLoaded", () => {
	loadTranslations().then(() => {
		// Retrieve the language from localStorage (default to 'en' if not set)
		const selectedLanguage =
			localStorage.getItem("selectedLanguage") || "hr";

		// Apply the saved language to the page
		updateLanguage(selectedLanguage);
	});
});

document.addEventListener("DOMContentLoaded", function () {
	const image = document.querySelector(".spinning-image");

	if (image) {
		// Check if the element exists
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						image.classList.add("spinning"); // Start spinning and scaling
						image.style.opacity = "1"; // Ensure it's visible when spinning
					} else {
						image.classList.remove("spinning"); // Stop spinning and scaling
						image.style.opacity = "0"; // Hide when not visible
					}
				});
			},
			{
				threshold: 0.5, // Trigger when 50% of the image is visible
			}
		);

		observer.observe(image);
	} else {
		console.warn("Element with class 'spinning-image' not found.");
	}
});


// Initialize the map and set its view to Caffe Bar Belvedere's coordinates
// Initialize the map and set its view only if the map container exists
document.addEventListener("DOMContentLoaded", function () {
    const mapContainer = document.getElementById("map");

    if (mapContainer) { // Check if the map container exists
        var map = L.map(mapContainer).setView([43.5133855156846, 16.471894099491497], 14);

        // Add OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 18,
        }).addTo(map);

        // Add a marker for Caffe Bar Belvedere
        var marker = L.marker([43.5133855156846, 16.471894099491497]).addTo(map);

        // Add a popup to the marker
        marker.bindPopup(
            "<b>Caffe Bar Belvedere</b><br>Velebitska ul. 123<br> 21000 Split, Croatia"
        ).openPopup();
    }
});

// Function to show the event content based on the selected tab
// Function to show the event content based on the selected tab
function showEvent(eventName, event) {
	// Hide all event content
	var contents = document.getElementsByClassName("event-content");
	for (var i = 0; i < contents.length; i++) {
		contents[i].style.display = "none"; // Hide each content div
	}

	// Remove the active class from all tab buttons
	var buttons = document.getElementsByClassName("tab-button");
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].classList.remove("active-tab");
	}

	// Show the selected event content
	var selectedContent = document.getElementById(eventName);
	if (selectedContent) {
		selectedContent.style.display = "block"; // Show the selected content
	}

	// Add the active class to the selected button if event is defined
	if (event) {
		event.currentTarget.classList.add("active-tab");
	}
}

// By default, show the "Weekend Parties" content
document.addEventListener("DOMContentLoaded", function () {
	showEvent("parties", null); // Pass null for the initial call

	// Add event listeners to buttons (optional if using inline onclick)
	var buttons = document.getElementsByClassName("tab-button");
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener("click", function (event) {
			showEvent(this.getAttribute("data-event"), event); // Pass the event
		});
	}
});

// JavaScript for review slider
// let currentReviewIndex = 0;
// const reviews = document.querySelectorAll(".review");
// const totalReviews = reviews.length;
// const reviewContainer = document.querySelector(".reviews-slider");

// document.querySelector(".next-btn").addEventListener("click", () => {
// 	changeReview(1);
// });

// document.querySelector(".prev-btn").addEventListener("click", () => {
// 	changeReview(-1);
// });

// function changeReview(direction) {
// 	currentReviewIndex =
// 		(currentReviewIndex + direction + totalReviews) % totalReviews;

// 	// Shift the entire container by 100% times the current index
// 	reviewContainer.style.transform = `translateX(-${
// 		currentReviewIndex * 100
// 	}%)`;
// }

// document
// 	.getElementById("review-form")
// 	.addEventListener("submit", function (event) {
// 		event.preventDefault();

// 		// Get input values
// 		const reviewText = document.getElementById("review-text").value;
// 		const reviewName = document.getElementById("review-name").value;

// 		// Validate input
// 		if (reviewText === "" || reviewName === "") {
// 			alert("Please complete both fields.");
// 			return;
// 		}

// 		// Create a new review element
// 		const newReview = document.createElement("div");
// 		newReview.classList.add("review");
// 		newReview.innerHTML = `
//         <p>"${reviewText}"</p>
//         <h3>– ${reviewName}</h3>
//     `;

// 		// Add new review to the slider
// 		document.querySelector(".reviews-slider").appendChild(newReview);

// 		// Clear form
// 		document.getElementById("review-text").value = "";
// 		document.getElementById("review-name").value = "";

// 		// Optional: show success message or update slider to show new review
// 		alert("Thank you for your review!");
// 	});
