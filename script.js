document.addEventListener("DOMContentLoaded", function () {
	window.addEventListener("scroll", function () {
		var navSection = document.getElementById("navSection");
		var logo = document.getElementById("belvederLogo");
		var navBar = document.getElementById("navBar");

		if (window.scrollY > 50) {
			navBar.style.visibility = "visible";
			logo.style.width = "15vw";
			navSection.style.backgroundColor = "rgb(70, 130, 180)";
		} else {
			navBar.style.visibility = "hidden";
			logo.style.width = "20vw";
			navSection.style.backgroundColor = "transparent";
		}
	});
});

document.addEventListener("DOMContentLoaded", function () {
	const image = document.querySelector(".spinning-image");

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
});

// Initialize the map and set its view to Caffe Bar Belvedere's coordinates
var map = L.map("map").setView([43.5133855156846, 16.471894099491497], 14);

// Add OpenStreetMap tiles (free and open-source)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	maxZoom: 18,
}).addTo(map);

// Add a marker (pin) for Caffe Bar Belvedere
var marker = L.marker([43.5133855156846, 16.471894099491497]).addTo(map);

// Add a popup to the marker
marker
	.bindPopup(
		"<b>Caffe Bar Belvedere</b><br>Velebitska ul. 123<br> 21000 Split, Croatia"
	)
	.openPopup();

// Function to show the event content based on the selected tab
function showEvent(eventName) {
	// Hide all event content
	var contents = document.getElementsByClassName("event-content");
	for (var i = 0; i < contents.length; i++) {
		contents[i].style.display = "none";
	}

	// Remove the active class from all tab buttons
	var buttons = document.getElementsByClassName("tab-button");
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].classList.remove("active-tab");
	}

	// Show the selected event content
	document.getElementById(eventName).style.display = "block";

	// Add the active class to the selected button
	event.currentTarget.classList.add("active-tab");
}

// By default, show the "Weekend Parties" content
document.addEventListener("DOMContentLoaded", function () {
	showEvent("parties");
});

// JavaScript for review slider
let currentReviewIndex = 0;
const reviews = document.querySelectorAll(".review");
const totalReviews = reviews.length;

document.querySelector(".next-btn").addEventListener("click", () => {
	changeReview(1);
});

document.querySelector(".prev-btn").addEventListener("click", () => {
	changeReview(-1);
});

function changeReview(direction) {
	// Hide the current review
	reviews[currentReviewIndex].style.transform = `translateX(${
		direction * 100
	}%)`;

	// Update the review index
	currentReviewIndex =
		(currentReviewIndex + direction + totalReviews) % totalReviews;

	// Show the next review
	reviews[currentReviewIndex].style.transform = `translateX(0)`;
}

// Submit a new review
document
	.getElementById("review-form")
	.addEventListener("submit", function (event) {
		event.preventDefault();

		// Get input values
		const reviewText = document.getElementById("review-text").value;
		const reviewName = document.getElementById("review-name").value;

		// Validate input
		if (reviewText === "" || reviewName === "") {
			alert("Please complete both fields.");
			return;
		}

		// Create a new review element
		const newReview = document.createElement("div");
		newReview.classList.add("review");
		newReview.innerHTML = `
        <p>"${reviewText}"</p>
        <h3>– ${reviewName}</h3>
    `;

		// Add new review to the slider
		document.querySelector(".reviews-slider").appendChild(newReview);

		// Clear form
		document.getElementById("review-text").value = "";
		document.getElementById("review-name").value = "";

		// Optional: show success message or update slider to show new review
		alert("Thank you for your review!");
	});


