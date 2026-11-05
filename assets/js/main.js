function showAlert(alertBox, type, message) {
    alertBox.className = "alert alert-" + type;
    alertBox.textContent = message;
}
 
function hideAlert(alertBox) {
    alertBox.className = "alert d-none";
    alertBox.textContent = "";
}
 
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const eventsData = [
    {
        id: "technology-workshop",
        title: "Technology Workshop",
        category: "technology",
        categoryLabel: "Technology",
        date: "2026-11-08",
        dateText: "8 November 2026",
        location: "Damascus",
        venue: "SVU Main Hub, Damascus",
        image: "assets/img/event1.jpg",
        alt: "Technology workshop",
        description: "Discover the latest technologies and innovations. This workshop covers modern developments in software engineering and student projects. Join us to learn practical skills and explore future technological horizons.",
        map: "assets/img/location001.PNG",
        gallery: ["assets/img/techworkshop.jpg", "assets/img/techworkshop001.jpg"]
    },
    {
        id: "cultural-festival",
        title: "Cultural Festival",
        category: "culture",
        categoryLabel: "Cultural",
        date: "2026-11-12",
        dateText: "12 November 2026",
        location: "Damascus",
        venue: "SVU Main Hub, Damascus",
        image: "assets/img/event2.jpg",
        alt: "Cultural festival",
        description: "Celebrate culture, art, and creativity at the SVU Cultural Festival. Students and guests share music, poetry, traditional crafts, and live performances that reflect the diversity of our community. Visit the exhibition stalls, meet the student artists, and stay for the evening show. Everyone is welcome.",
        map: "assets/img/location001.PNG",
        gallery: ["assets/img/event6.jpg"]
    },
    {
        id: "sports-competition",
        title: "Sports Competition",
        category: "sports",
        categoryLabel: "Sports",
        date: "2026-11-13",
        dateText: "13 November 2026",
        location: "Aleppo",
        venue: "SVU Center, Aleppo",
        image: "assets/img/event3.jpg",
        alt: "Sports competition",
        description: "Enjoy a day of friendly competition between university teams. Matches include football, volleyball, and table tennis, and every student can take part as a player or as a supporter. Register with your branch coordinator and bring your sports gear. Medals are awarded to the winning teams at the end of the day.",
        map: "",
        gallery: []
    },
    {
        id: "programming-day",
        title: "Programming Day",
        category: "technology",
        categoryLabel: "Technology",
        date: "2026-11-15",
        dateText: "15 November 2026",
        location: "Homs",
        venue: "SVU Center, Homs",
        image: "assets/img/event4.jpg",
        alt: "Programming day",
        description: "A full day about the latest programming technologies. Developers from the university and the industry give short talks on web, mobile, and software engineering, followed by a hands-on coding session. Beginners are welcome. Bring your laptop and get ready to build something small.",
        map: "",
        gallery: ["assets/img/techworkshop.jpg", "assets/img/techworkshop001.jpg"]
    },
    {
        id: "art-gallery",
        title: "Art Gallery",
        category: "culture",
        categoryLabel: "Cultural",
        date: "2026-11-20",
        dateText: "20 November 2026",
        location: "Hama",
        venue: "SVU Center, Hama",
        image: "assets/img/event6.jpg",
        alt: "Art gallery",
        description: "A journey between paintings and creativity. The gallery shows original works by SVU students and local artists, from portraits and landscapes to modern abstract pieces. Visitors can talk with the artists, learn about their techniques, and vote for their favorite piece.",
        map: "",
        gallery: ["assets/img/event2.jpg"]
    },
    {
        id: "graduation-ceremony-2026",
        title: "Graduation Ceremony 2026",
        category: "family",
        categoryLabel: "Family",
        date: "2026-12-30",
        dateText: "30 December 2026",
        location: "Damascus",
        venue: "SVU Main Hub, Damascus",
        image: "assets/img/event5.jpg",
        alt: "Graduation ceremony",
        description: "A celebration for the class of 2026. Graduates, families, and friends gather to honor years of hard work, with speeches from the faculty, the awarding of certificates, and the traditional cap toss. Families are welcome to attend and take photos with the graduates.",
        map: "assets/img/location001.PNG",
        gallery: []
    }
];
 
 
const categoryBadges = document.querySelectorAll(".category-badge");
const latestEvents = document.querySelectorAll(".latest-events [data-category]");
const latestEmpty = document.getElementById("latest-empty");

categoryBadges.forEach(badge => {
    badge.addEventListener("click", () => {
        const selectedCategory = badge.dataset.filter;
        let visibleCount = 0;
 
        categoryBadges.forEach(item => item.classList.remove("active"));
        badge.classList.add("active");
 
        latestEvents.forEach(card => {
            const matches = selectedCategory === "all" || card.dataset.category === selectedCategory;
            card.classList.toggle("d-none", !matches);
            if (matches) {
                visibleCount++;
            }
        });
 
        latestEmpty.classList.toggle("d-none", visibleCount > 0);
    });
});
 
 
const searchInput = document.getElementById("search-find-input");
const categoryFilter = document.getElementById("category-filter");
const dateFilter = document.getElementById("date-filter");
const locationFilter = document.getElementById("location-filter");
const eventCards = document.querySelectorAll(".event-card");
const emptyMessage = document.getElementById("empty-event");
 
if (searchInput && categoryFilter && dateFilter && locationFilter) {
 
    function filterEvents() {
        const searchText = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const selectedDate = dateFilter.value;
        const selectedLocation = locationFilter.value;
        let visibleCount = 0;
 
        eventCards.forEach(card => {
            const title = card.querySelector(".card-title").textContent.toLowerCase();
 
            const matchesSearch = title.includes(searchText);
            const matchesCategory = selectedCategory === "" || card.dataset.category === selectedCategory;
            const matchesDate = selectedDate === "" || card.dataset.date === selectedDate;
            const matchesLocation = selectedLocation === "" || card.dataset.location === selectedLocation;
 
            const isMatch = matchesSearch && matchesCategory && matchesDate && matchesLocation;
 
            card.classList.toggle("d-none", !isMatch);
            if (isMatch) {
                visibleCount++;
            }
        });
 
        emptyMessage.classList.toggle("d-none", visibleCount > 0);
    }
 
    searchInput.addEventListener("input", filterEvents);
    categoryFilter.addEventListener("change", filterEvents);
    dateFilter.addEventListener("change", filterEvents);
    locationFilter.addEventListener("change", filterEvents);
}

 
const eventTitle = document.getElementById("event-title");
 
if (eventTitle && typeof eventsData !== "undefined") {
 
    const eventId = new URLSearchParams(window.location.search).get("id");
 
    const currentEvent = eventId === null
        ? eventsData[0]
        : eventsData.find(item => item.id === eventId);
 
    if (currentEvent) {
        showEvent(currentEvent);
    } else {
        eventTitle.textContent = "Event not found";
        document.getElementById("event-notfound").classList.remove("d-none");
        document.getElementById("event-details").classList.add("d-none");
        document.getElementById("related-events").classList.add("d-none");
    }
 
    function showEvent(item) {
        document.title = item.title + " | SVU Events";
 
        eventTitle.textContent = item.title;
        const badge = document.getElementById("event-badge");
        badge.textContent = item.categoryLabel;
        badge.className = "badge " + item.category;  
 
        document.getElementById("event-date").textContent = item.dateText;
        document.getElementById("event-location").textContent = item.location;
        document.getElementById("event-image").src = item.image;
        document.getElementById("event-image").alt = item.alt;
        document.getElementById("event-description").textContent = item.description;
 
        document.getElementById("event-venue").textContent = item.venue;
        const mapImage = document.getElementById("event-map");
        mapImage.classList.toggle("d-none", item.map === "");
        if (item.map !== "") {
            mapImage.src = item.map;
            mapImage.alt = "Map of " + item.venue;
        }
 
        document.getElementById("event-gallery-card").classList.toggle("d-none", item.gallery.length === 0);
        document.getElementById("event-gallery").innerHTML = item.gallery.map(photo =>
            '<div class="col-6"><img src="' + photo + '" alt="' + item.title + ' photo"></div>'
        ).join("");
 
        document.getElementById("reserveEventInfo").textContent =
            item.title + " · " + item.dateText + " · " + item.location;
 
        showRelatedEvents(item);
    }
 
    function showRelatedEvents(item) {
        const others = eventsData.filter(other => other.id !== item.id);
        others.sort((a, b) => (b.category === item.category) - (a.category === item.category));
 
        document.getElementById("related-events-list").innerHTML = others.slice(0, 3).map(other =>
            '<div class="col-md-4">' +
                '<div class="card">' +
                    '<img src="' + other.image + '" class="card-img-top" alt="' + other.alt + '">' +
                    '<div class="card-body">' +
                        '<h3 class="card-title">' + other.title + '</h3>' +
                        '<p class="card-text">Date: ' + other.dateText + '</p>' +
                        '<a href="event.html?id=' + other.id + '" class="btn btn-primary">Details</a>' +
                    '</div>' +
                '</div>' +
            '</div>'
        ).join("");
    }
}
 
 
const reserveForm = document.getElementById("reserveForm");
 
if (reserveForm) {
    const reserveModal = document.getElementById("reserveModal");
    const reserveAlert = document.getElementById("reserveAlert");
    const reserveName = document.getElementById("reserveName");
    const reserveEmail = document.getElementById("reserveEmail");
 
    reserveForm.addEventListener("submit", event => {
        event.preventDefault(); 
 
        if (reserveName.value.trim() === "") {
            showAlert(reserveAlert, "danger", "Please enter your name.");
        } else if (!isValidEmail(reserveEmail.value.trim())) {
            showAlert(reserveAlert, "danger", "Please enter a valid email address.");
        } else {
            showAlert(reserveAlert, "success", "Thank you, " + reserveName.value.trim() + "! Your spot is reserved.");
            reserveForm.reset();
        }
    });
 
    reserveModal.addEventListener("hidden.bs.modal", () => {
        reserveForm.reset();
        hideAlert(reserveAlert);
    });
}


document.addEventListener("DOMContentLoaded", function () {

    const categoryBadges = document.querySelectorAll(".category-badge");
    const eventCards = document.querySelectorAll(".latest-events [data-category]");

    categoryBadges.forEach(badge => {

        badge.addEventListener("click", function () {

            const selectedCategory = this.dataset.filter;

            categoryBadges.forEach(item => {
                item.classList.remove("active");
            });

            this.classList.add("active");

            eventCards.forEach(card => {

                const category = card.dataset.category;

                if (
                    selectedCategory === "all" ||
                    category === selectedCategory
                ) {
                    card.classList.remove("d-none");
                } else {
                    card.classList.add("d-none");
                }

            });

        });

    });

});


document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("search-find-input");
    const categoryFilter = document.getElementById("category-filter");
    const dateFilter = document.getElementById("date-filter");
    const locationFilter = document.getElementById("location-filter");

    const eventCards = document.querySelectorAll(".event-card");
    const emptyMessage = document.getElementById("empty-event");

    function filterEvents() {

        const searchValue = searchInput.value.toLowerCase().trim();

        const categoryValue = categoryFilter.value;
        const dateValue = dateFilter.value;
        const locationValue = locationFilter.value;

        let visibleCount = 0;

        eventCards.forEach(card => {

            const title = card.querySelector(".card-title")?.textContent || "";
            const description = card.textContent || "";

            const category = card.dataset.category;
            const date = card.dataset.date;
            const location = card.dataset.location;

            const matchesSearch =
                (title + " " + description)
                .toLowerCase()
                .includes(searchValue);

            const matchesCategory =
                categoryValue === "" || category === categoryValue;

            const matchesDate =
                dateValue === "" || date === dateValue;

            const matchesLocation =
                locationValue === "" || location === locationValue;

            const show =
                matchesSearch &&
                matchesCategory &&
                matchesDate &&
                matchesLocation;

            card.classList.toggle("d-none", !show);

            if (show) {
                visibleCount++;
            }

        });

        if (emptyMessage) {
            emptyMessage.classList.toggle("d-none", visibleCount !== 0);
        }

    }

    if (searchInput && categoryFilter && dateFilter && locationFilter) {

        searchInput.addEventListener("input", filterEvents);

        categoryFilter.addEventListener("change", filterEvents);

        dateFilter.addEventListener("change", filterEvents);

        locationFilter.addEventListener("change", filterEvents);

    }

});


document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contactForm");

    if (!contactForm) return;

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    let alertBox = document.getElementById("formAlert");

    if (!alertBox) {

        alertBox = document.createElement("div");

        alertBox.id = "formAlert";

        alertBox.className = "alert d-none mt-3";

        contactForm.prepend(alertBox);

    }

    function showMessage(message, type) {

        alertBox.textContent = message;

        alertBox.className = "alert alert-" + type + " mt-3";

    }

    function isValidEmail(email) {

        const emailPattern =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        return emailPattern.test(email);

    }

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        alertBox.classList.add("d-none");

        [nameInput, emailInput, messageInput].forEach(input => {
            input.classList.remove("is-invalid");
        });

        if (nameInput.value.trim() === "") {

            nameInput.classList.add("is-invalid");

            showMessage("Please enter your full name.", "danger");

            nameInput.focus();

            return;

        }

        if (!isValidEmail(emailInput.value.trim())) {

            emailInput.classList.add("is-invalid");

            showMessage("Please enter a valid email address.", "danger");

            emailInput.focus();

            return;

        }

        if (messageInput.value.trim() === "") {

            messageInput.classList.add("is-invalid");

            showMessage("Please enter your message.", "danger");

            messageInput.focus();

            return;

        }

        showMessage("Your message has been validated successfully!", "success");

        contactForm.reset();

    });

});


