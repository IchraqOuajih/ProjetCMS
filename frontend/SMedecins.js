const doctorsData = [
  {
    id: 1,
    name: "Dr Hamid EL HARTI",
    speciality: "coeur",
    city: "Casablanca",
    rating: 4.8,
    avatar: "AB",
    availability: "today",
    times: [
      { hour: "09:00", status: "available" },
      { hour: "09:30", status: "available" },
      { hour: "10:00", status: "available" },
      { hour: "10:30", status: "reserved" },
      { hour: "11:00", status: "available" }
    ],
    price: 150
  },
  {
    id: 2,
    name: "Dr Salma BENNANI",
    speciality: "os",
    city: "Rabat",
    rating: 4.5,
    avatar: "SB",
    availability: "week",
    times: [
      { hour: "08:00", status: "available" },
      { hour: "08:30", status: "available" },
      { hour: "09:00", status: "reserved" },
      { hour: "09:30", status: "available" }
    ],
    price: 200
  }
];

const doctorsList = document.getElementById("doctorsList");

// ===== RENDER DOCTORS =====
function renderDoctors(data) {
  doctorsList.innerHTML = "";

  data.forEach(doc => {
    const card = document.createElement("article");
    card.classList.add("doctor-card");
    card.dataset.cat = doc.speciality;
    card.dataset.availability = doc.availability;

    card.innerHTML = `
      <div class="doctor-main">
        <div class="doctor-avatar">${doc.avatar}</div>
        <div class="doctor-info">
          <h3>${doc.name}</h3>
          <p>${capitalize(doc.speciality)} · ${doc.city}</p>
          <div class="doctor-meta">
            <span class="rating">⭐ ${doc.rating}</span>
            <span class="badge verified">✔ Vérifié</span>
            <span class="badge available">Disponible</span>
          </div>
        </div>
        <button class="fav-btn"><i data-lucide="heart"></i></button>
      </div>

      <div class="doctor-actions">
        <div class="days">
          <button class="day active">Aujourd’hui</button>
          <button class="day">Demain</button>
          <button class="day">Autre</button>
        </div>
        <div class="times-wrapper">
          <button class="nav prev">‹</button>
          <div class="times slider">
            ${renderTimes(doc.times)}
          </div>
          <button class="nav next">›</button>
        </div>
      </div>

      <div class="doctor-footer">
        <span class="price">Consultation : <strong>${doc.price} DH</strong></span>
        <button class="reserve-btn">Prendre rendez-vous</button>
      </div>
    `;
    doctorsList.appendChild(card);
  });

  // Initialiser Lucide Icons
  lucide.replace();

  // Ajouter événements boutons
  attachDoctorCardEvents();
}

// ===== RENDER TIMES 4 PAR 4 =====
function renderTimes(times) {
  const pages = [];
  for (let i = 0; i < times.length; i += 4) {
    const chunk = times.slice(i, i + 4);
    const page = `<div class="times-page${i === 0 ? ' active' : ''}">` +
      chunk.map(t => `<button class="time ${t.status}">${t.hour}</button>`).join("") +
      `</div>`;
    pages.push(page);
  }
  return pages.join("");
}

// ===== CAPITALIZE =====
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ===== FILTRAGE =====
const specialityFilter = document.getElementById("specialityFilter");
const availabilityFilter = document.getElementById("availabilityFilter");

function applyFilters() {
  const specialityValue = specialityFilter.value;
  const availabilityValue = availabilityFilter.value;

  const doctorCards = document.querySelectorAll(".doctor-card");

  doctorCards.forEach(card => {
    const matchSpeciality =
      specialityValue === "all" || card.dataset.cat === specialityValue;

    const matchAvailability =
      availabilityValue === "all" || card.dataset.availability === availabilityValue;

    card.style.display = matchSpeciality && matchAvailability ? "block" : "none";
  });
}

specialityFilter.addEventListener("change", applyFilters);
availabilityFilter.addEventListener("change", applyFilters);

// ===== EVENTS DES BUTTONS DYNAMIQUES =====
function attachDoctorCardEvents() {
  document.querySelectorAll(".fav-btn").forEach(btn => {
    btn.addEventListener("click", () => btn.classList.toggle("fav-active"));
  });

  document.querySelectorAll(".doctor-card .day").forEach(dayBtn => {
    dayBtn.addEventListener("click", () => {
      const parent = dayBtn.parentElement;
      parent.querySelectorAll(".day").forEach(d => d.classList.remove("active"));
      dayBtn.classList.add("active");
    });
  });

  document.querySelectorAll(".doctor-card .nav").forEach(navBtn => {
    navBtn.addEventListener("click", () => {
      const wrapper = navBtn.parentElement.querySelector(".slider");
      const pages = wrapper.querySelectorAll(".times-page");
      let current = Array.from(pages).findIndex(p => p.classList.contains("active"));
      pages[current].classList.remove("active");
      if (navBtn.classList.contains("prev")) {
        current = current - 1 < 0 ? pages.length - 1 : current - 1;
      } else {
        current = current + 1 >= pages.length ? 0 : current + 1;
      }
      pages[current].classList.add("active");
    });
  });

  document.querySelectorAll(".doctor-card .time").forEach(timeBtn => {
    timeBtn.addEventListener("click", () => {
      const sibling = timeBtn.parentElement.querySelectorAll(".time");
      sibling.forEach(t => t.classList.remove("active"));
      timeBtn.classList.add("active");
    });
  });

  document.querySelectorAll(".doctor-card .reserve-btn").forEach(resBtn => {
    resBtn.addEventListener("click", () => alert("Rendez-vous pris !"));
  });
}

// ===== INIT =====
renderDoctors(doctorsData);

// ===== ATTACH EVENTS DES BOUTONS DYNAMIQUES =====
function attachDoctorCardEvents() {

  // FAVORIS
  document.querySelectorAll(".fav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("fav-active");
    });
  });

  // SELECTION DES JOURS
  document.querySelectorAll(".doctor-card .day").forEach(dayBtn => {
    dayBtn.addEventListener("click", () => {
      const parent = dayBtn.parentElement; // div.days
      parent.querySelectorAll(".day").forEach(d => d.classList.remove("active"));
      dayBtn.classList.add("active");
    });
  });

  // SLIDER DE TEMPS
  document.querySelectorAll(".doctor-card .nav").forEach(navBtn => {
    navBtn.addEventListener("click", () => {
      const wrapper = navBtn.parentElement.querySelector(".slider");
      const pages = wrapper.querySelectorAll(".times-page");
      let current = Array.from(pages).findIndex(p => p.classList.contains("active"));
      pages[current].classList.remove("active");

      if (navBtn.classList.contains("prev")) {
        current = current - 1 < 0 ? pages.length - 1 : current - 1;
      } else {
        current = current + 1 >= pages.length ? 0 : current + 1;
      }

      pages[current].classList.add("active");
    });
  });

  // SELECTION DES HEURES
  document.querySelectorAll(".doctor-card .time").forEach(timeBtn => {
    timeBtn.addEventListener("click", () => {
      const sibling = timeBtn.parentElement.querySelectorAll(".time");
      sibling.forEach(t => t.classList.remove("active"));
      timeBtn.classList.add("active");
    });
  });

  // BOUTON RESERVER
  document.querySelectorAll(".doctor-card .reserve-btn").forEach(resBtn => {
    resBtn.addEventListener("click", () => {
      const card = resBtn.closest(".doctor-card");
      const doctorName = card.querySelector(".doctor-info h3").textContent;
      const selectedTime = card.querySelector(".time.active")?.textContent || "Non sélectionné";
      alert(`Rendez-vous pris avec ${doctorName} à ${selectedTime} !`);
    });
  });
}
attachDoctorCardEvents();

/***************************** */
const doctors = [
  {
    id: 1,
    name: "Dr Hamid EL HARTI",
    speciality: "Cardiologie",
    city: "Casablanca",
    rating: 4.8,
    verified: true,
    available: true,
    price: 150,
    category: "coeur",
    availability: "today",
    avatar: "HE",
    days: ["Aujourd’hui", "Demain", "Autre"],
    times: [
      {
        slots: [
          { time: "09:00", status: "available" },
          { time: "09:30", status: "available" },
          { time: "10:00", status: "reserved" },
          { time: "10:30", status: "available" }
        ]
      },
      {
        slots: [
          { time: "11:00", status: "available" },
          { time: "11:30", status: "reserved" },
          { time: "12:00", status: "available" },
          { time: "12:30", status: "available" }
        ]
      }
    ]
  },

  {
    id: 2,
    name: "Dr Amina LAMRANI",
    speciality: "Orthopédie",
    city: "Rabat",
    rating: 4.6,
    verified: true,
    available: true,
    price: 130,
    category: "os",
    availability: "today",
    avatar: "AL",
    days: ["Aujourd’hui", "Demain", "Autre"],
    times: [
      {
        slots: [
          { time: "08:30", status: "available" },
          { time: "09:00", status: "available" },
          { time: "09:30", status: "reserved" },
          { time: "10:00", status: "available" }
        ]
      },
      {
        slots: [
          { time: "10:30", status: "available" },
          { time: "11:00", status: "reserved" },
          { time: "11:30", status: "available" },
          { time: "12:00", status: "available" }
        ]
      }
    ]
  },

  {
    id: 3,
    name: "Dr Sara BENALI",
    speciality: "Dermatologie",
    city: "Fès",
    rating: 4.4,
    verified: false,
    available: false,
    price: 120,
    category: "peau",
    availability: "tomorrow",
    avatar: "SB",
    days: ["Demain", "Autre"],
    times: [
      {
        slots: [
          { time: "14:00", status: "reserved" },
          { time: "14:30", status: "reserved" },
          { time: "15:00", status: "available" },
          { time: "15:30", status: "available" }
        ]
      }
    ]
  },

  {
    id: 4,
    name: "Dr Youssef KHALDI",
    speciality: "Pédiatrie",
    city: "Marrakech",
    rating: 4.7,
    verified: true,
    available: true,
    price: 100,
    category: "enfant",
    availability: "today",
    avatar: "YK",
    days: ["Aujourd’hui", "Demain"],
    times: [
      {
        slots: [
          { time: "09:00", status: "available" },
          { time: "09:30", status: "available" },
          { time: "10:00", status: "available" },
          { time: "10:30", status: "reserved" }
        ]
      },
      {
        slots: [
          { time: "11:00", status: "available" },
          { time: "11:30", status: "available" },
          { time: "12:00", status: "reserved" },
          { time: "12:30", status: "available" }
        ]
      }
    ]
  },

  {
    id: 5,
    name: "Dr Nadia OUAZZANI",
    speciality: "Gynécologie",
    city: "Tanger",
    rating: 4.9,
    verified: true,
    available: true,
    price: 180,
    category: "femme",
    availability: "today",
    avatar: "NO",
    days: ["Aujourd’hui", "Demain", "Autre"],
    times: [
      {
        slots: [
          { time: "08:00", status: "available" },
          { time: "08:30", status: "available" },
          { time: "09:00", status: "reserved" },
          { time: "09:30", status: "available" }
        ]
      }
    ]
  }
];


const container = document.getElementById("doctors-list");

doctors.forEach(doctor => {
  const article = document.createElement("article");
  article.className = "doctor-card";
  article.dataset.cat = doctor.category;
  article.dataset.availability = doctor.availability;

  article.innerHTML = `
    <!-- HEADER -->
    <div class="doctor-main">

      <div class="doctor-avatar">${doctor.avatar}</div>

      <div class="doctor-info">
        <h3>${doctor.name}</h3>
        <p>${doctor.speciality} · ${doctor.city}</p>

        <div class="doctor-meta">
          <span class="rating">⭐ ${doctor.rating}</span>
          ${doctor.verified ? `<span class="badge verified">✔ Vérifié</span>` : ""}
          <span class="badge ${doctor.available ? "available" : "unavailable"}">
            ${doctor.available ? "Disponible" : "Indisponible"}
          </span>
        </div>
      </div>

      <button class="fav-btn" title="Ajouter aux favoris">
        ❤
      </button>

    </div>

    <!-- ACTIONS -->
    <div class="doctor-actions">

      <!-- DAYS -->
      <div class="days">
        ${doctor.days
          .map(
            (day, index) =>
              `<button class="day ${index === 0 ? "active" : ""}">${day}</button>`
          )
          .join("")}
      </div>

      <!-- TIMES -->
      <div class="times-wrapper">

        <div class="times">
          ${doctor.times
            .map(
              (page, index) => `
              <div class="times-page ${index === 0 ? "active" : ""}">
                ${page.slots
                  .map(
                    slot =>
                      `<button class="time ${slot.status}">${slot.time}</button>`
                  )
                  .join("")}
              </div>
            `
            )
            .join("")}
        </div>


      </div>
    </div>

    <!-- FOOTER -->
    <div class="doctor-footer">
      <span class="price">Consultation : <strong>${doctor.price} DH</strong></span>
      <button class="reserve-btn">Prendre rendez-vous</button>
    </div>
  `;

  container.appendChild(article);
});



const doctorsList = document.getElementById("doctorsList");

// ===== RENDER DOCTORS =====
function renderDoctors(data) {
  doctorsList.innerHTML = "";

  data.forEach(doc => {
    const card = document.createElement("article");
    card.classList.add("doctor-card");
    card.dataset.cat = doc.speciality;
    card.dataset.availability = doc.availability;

    card.innerHTML = `
      <div class="doctor-main">
        <div class="doctor-avatar">${doc.avatar}</div>
        <div class="doctor-info">
          <h3>${doc.name}</h3>
          <p>${capitalize(doc.speciality)} · ${doc.city}</p>
          <div class="doctor-meta">
            <span class="rating">⭐ ${doc.rating}</span>
            <span class="badge verified">✔ Vérifié</span>
            <span class="badge available">Disponible</span>
          </div>
        </div>
        <button class="fav-btn"><i data-lucide="heart"></i></button>
      </div>

      <div class="doctor-actions">
        <div class="days">
          <button class="day active">Aujourd’hui</button>
          <button class="day">Demain</button>
          <button class="day">Autre</button>
        </div>
        <div class="times-wrapper">
          <button class="nav prev">‹</button>
          <div class="times slider">
            ${renderTimes(doc.times)}
          </div>
          <button class="nav next">›</button>
        </div>
      </div>

      <div class="doctor-footer">
        <span class="price">Consultation : <strong>${doc.price} DH</strong></span>
        <button class="reserve-btn">Prendre rendez-vous</button>
      </div>
    `;
    doctorsList.appendChild(card);
  });

  // Initialiser Lucide Icons
  lucide.replace();

  // Ajouter événements boutons
  attachDoctorCardEvents();
}

// ===== RENDER TIMES 4 PAR 4 =====
function renderTimes(times) {
  const pages = [];
  for (let i = 0; i < times.length; i += 4) {
    const chunk = times.slice(i, i + 4);
    const page = `<div class="times-page${i === 0 ? ' active' : ''}">` +
      chunk.map(t => `<button class="time ${t.status}">${t.hour}</button>`).join("") +
      `</div>`;
    pages.push(page);
  }
  return pages.join("");
}

// ===== CAPITALIZE =====
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ===== FILTRAGE =====
const specialityFilter = document.getElementById("specialityFilter");
const availabilityFilter = document.getElementById("availabilityFilter");

function applyFilters() {
  const specialityValue = specialityFilter.value;
  const availabilityValue = availabilityFilter.value;

  const doctorCards = document.querySelectorAll(".doctor-card");

  doctorCards.forEach(card => {
    const matchSpeciality =
      specialityValue === "all" || card.dataset.cat === specialityValue;

    const matchAvailability =
      availabilityValue === "all" || card.dataset.availability === availabilityValue;

    card.style.display = matchSpeciality && matchAvailability ? "block" : "none";
  });
}

specialityFilter.addEventListener("change", applyFilters);
availabilityFilter.addEventListener("change", applyFilters);

// ===== EVENTS DES BUTTONS DYNAMIQUES =====
function attachDoctorCardEvents() {
  document.querySelectorAll(".fav-btn").forEach(btn => {
    btn.addEventListener("click", () => btn.classList.toggle("fav-active"));
  });

  document.querySelectorAll(".doctor-card .day").forEach(dayBtn => {
    dayBtn.addEventListener("click", () => {
      const parent = dayBtn.parentElement;
      parent.querySelectorAll(".day").forEach(d => d.classList.remove("active"));
      dayBtn.classList.add("active");
    });
  });

  document.querySelectorAll(".doctor-card .nav").forEach(navBtn => {
    navBtn.addEventListener("click", () => {
      const wrapper = navBtn.parentElement.querySelector(".slider");
      const pages = wrapper.querySelectorAll(".times-page");
      let current = Array.from(pages).findIndex(p => p.classList.contains("active"));
      pages[current].classList.remove("active");
      if (navBtn.classList.contains("prev")) {
        current = current - 1 < 0 ? pages.length - 1 : current - 1;
      } else {
        current = current + 1 >= pages.length ? 0 : current + 1;
      }
      pages[current].classList.add("active");
    });
  });

  document.querySelectorAll(".doctor-card .time").forEach(timeBtn => {
    timeBtn.addEventListener("click", () => {
      const sibling = timeBtn.parentElement.querySelectorAll(".time");
      sibling.forEach(t => t.classList.remove("active"));
      timeBtn.classList.add("active");
    });
  });

  document.querySelectorAll(".doctor-card .reserve-btn").forEach(resBtn => {
    resBtn.addEventListener("click", () => alert("Rendez-vous pris !"));
  });
}

// ===== INIT =====
renderDoctors(doctorsData);

// ===== ATTACH EVENTS DES BOUTONS DYNAMIQUES =====
function attachDoctorCardEvents() {

  // FAVORIS
  document.querySelectorAll(".fav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("fav-active");
    });
  });

  // SELECTION DES JOURS
  document.querySelectorAll(".doctor-card .day").forEach(dayBtn => {
    dayBtn.addEventListener("click", () => {
      const parent = dayBtn.parentElement; // div.days
      parent.querySelectorAll(".day").forEach(d => d.classList.remove("active"));
      dayBtn.classList.add("active");
    });
  });

  // SLIDER DE TEMPS
  document.querySelectorAll(".doctor-card .nav").forEach(navBtn => {
    navBtn.addEventListener("click", () => {
      const wrapper = navBtn.parentElement.querySelector(".slider");
      const pages = wrapper.querySelectorAll(".times-page");
      let current = Array.from(pages).findIndex(p => p.classList.contains("active"));
      pages[current].classList.remove("active");

      if (navBtn.classList.contains("prev")) {
        current = current - 1 < 0 ? pages.length - 1 : current - 1;
      } else {
        current = current + 1 >= pages.length ? 0 : current + 1;
      }

      pages[current].classList.add("active");
    });
  });

  // SELECTION DES HEURES
  document.querySelectorAll(".doctor-card .time").forEach(timeBtn => {
    timeBtn.addEventListener("click", () => {
      const sibling = timeBtn.parentElement.querySelectorAll(".time");
      sibling.forEach(t => t.classList.remove("active"));
      timeBtn.classList.add("active");
    });
  });

  // BOUTON RESERVER
  document.querySelectorAll(".doctor-card .reserve-btn").forEach(resBtn => {
    resBtn.addEventListener("click", () => {
      const card = resBtn.closest(".doctor-card");
      const doctorName = card.querySelector(".doctor-info h3").textContent;
      const selectedTime = card.querySelector(".time.active")?.textContent || "Non sélectionné";
      alert(`Rendez-vous pris avec ${doctorName} à ${selectedTime} !`);
    });
  });
}
attachDoctorCardEvents();
