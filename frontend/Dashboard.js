//activetyyyyyy sf reglty !
const navLinks = document.querySelectorAll('#main-nav a');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Supprime la classe active de tous les liens
        navLinks.forEach(l => l.classList.remove('active'));
        // Ajoute la classe active au lien cliqué
        this.classList.add('active');

        // Si le lien est une ancre (commence par #) et pas juste "#"
        if (this.getAttribute('href').startsWith('#') && this.getAttribute('href') !== '#') {
            e.preventDefault(); // empêche le jump instantané
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' }); // scroll fluide
        }
    });
});



//avatar 
// Avatar menu toggle
const avatarBtn = document.getElementById("avatar-btn");
const avatarMenu = document.getElementById("avatar-menu");

avatarBtn.addEventListener("click", () => {
    avatarMenu.classList.toggle("active");
});

// Fermer menu si on clique en dehors
document.addEventListener("click", (e) => {
    if (!avatarBtn.contains(e.target) && !avatarMenu.contains(e.target)) {
        avatarMenu.classList.remove("active");
    }
});

// Optionnel : gérer les boutons
document.getElementById("edit-profile-btn").addEventListener("click", () => {
    alert("Ouvrir page/modale pour modifier le profil");
});

document.getElementById("logout-btn").addEventListener("click", () => {
    alert("Déconnexion…");
});


//////////////////////
const header = document.getElementById("main-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

lucide.createIcons();

    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, appearOptions);
    faders.forEach(fader => appearOnScroll.observe(fader));
/**eeeeeeeeeeeee data */
const data = [
  { name: "Dr. Ahmed", service: "Médecin", city: "Casablanca" },
  { name: "Salon Lina", service: "Coiffeur", city: "Rabat" },
  { name: "Garage Plus", service: "Garage", city: "Casablanca" },
  { name: "TechFix", service: "Informatique", city: "Marrakech" }
];

const results = document.getElementById("results");

document.getElementById("searchBtn").addEventListener("click", () => {
  const service = serviceInput.value.toLowerCase();
  const city = cityInput.value.toLowerCase();

  results.innerHTML = "";

  data
    .filter(d =>
      d.service.toLowerCase().includes(service) &&
      d.city.toLowerCase().includes(city)
    )
    .forEach(d => {
      results.innerHTML += `
        <div class="card">
          <h3>${d.name}</h3>
          <p>${d.service}</p>
          <span>📍 ${d.city}</span>
        </div>
      `;
    });
});

/**mappp */
const openMapBtn = document.getElementById("openMapBtn");
const mapModal = document.getElementById("mapModal");
const closeMap = document.getElementById("closeMap");

openMapBtn.onclick = () => mapModal.classList.add("active");
closeMap.onclick = () => mapModal.classList.remove("active");

const map = L.map('map').setView([31.7917, -7.0926], 6); // Maroc

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

let marker;

map.on('click', function (e) {
  if (marker) map.removeLayer(marker);

  marker = L.marker(e.latlng).addTo(map);

  // ⚠️ Version simple (sans API)
  cityInput.value = "Ville sélectionnée sur la carte";
  mapModal.classList.remove("active");
});

// serv 
document.querySelectorAll(".service-box").forEach(box => {
  const img = box.getAttribute("data-bg");
  box.style.setProperty("--bg", `url(${img})`);
});
//back services 
const bubblesContainer = document.querySelector(".floating-bubbles");
const colors = ["#9d4edd", "#3b82f6"]; // couleurs du logo
const numBubbles = 30; // nombre de bulles

for (let i = 0; i < numBubbles; i++) {
  const bubble = document.createElement("div");
  const size = Math.random() * 15 + 10; // tailles différentes (10px à 25px)
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.background = colors[Math.floor(Math.random() * colors.length)];
  bubble.style.top = `${Math.random() * 100}%`;
  bubble.style.left = `${Math.random() * 100}%`;
  bubble.style.animationDuration = `${Math.random() * 15 + 10}s`; // vitesses différentes
  bubble.style.animationDelay = `${Math.random() * 5}s`;
  bubble.style.opacity = Math.random() * 0.5 + 0.3;
  bubblesContainer.appendChild(bubble);
}



