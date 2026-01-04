const specialityFilter = document.getElementById("specialityFilter");
const availabilityFilter = document.getElementById("availabilityFilter");
const doctorCards = document.querySelectorAll(".doctor-card");

function applyFilters() {
  const specialityValue = specialityFilter.value;
  const availabilityValue = availabilityFilter.value;

  doctorCards.forEach(card => {
    const matchSpeciality =
      specialityValue === "all" || card.dataset.cat === specialityValue;

    const matchAvailability =
      availabilityValue === "all" ||
      card.dataset.availability === availabilityValue;

    card.style.display =
      matchSpeciality && matchAvailability ? "block" : "none";
  });
}

specialityFilter.addEventListener("change", applyFilters);
availabilityFilter.addEventListener("change", applyFilters);


// ===== GENERATION DOCTORS LIST =====
const doctorsList = document.getElementById("doctorsList");
let doctorsData = [];

// FETCH JSON
fetch('doctors.json')
  .then(res => res.json())
  .then(data => {
    doctorsData = data;
    renderDoctors(doctorsData);
  });

// RENDER CARDS
function renderDoctors(data) {
  doctorsList.innerHTML = "";

  data.forEach(doc => {
    const card = document.createElement("article");
    card.classList.add("doctor-card");
    card.dataset.cat = doc.speciality;
    card.dataset.availability = doc.availability;

    // HEADER
    card.innerHTML = `
      <div class="doctor-main">
        <div class="doctor-avatar">${doc.avatar}</div>
        <div class="doctor-info">
          <h3>${doc.name}</h3>
          <p>${doc.speciality.charAt(0).toUpperCase()+doc.speciality.slice(1)} · ${doc.city}</p>
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
          <button class="nav" onclick="slideTimes(this,-1)">‹</button>
          <div class="times slider">
            ${renderTimes(doc.times)}
          </div>
          <button class="nav" onclick="slideTimes(this,1)">›</button>
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

  // Ajouter event favoris
  document.querySelectorAll(".fav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("fav-active");
    });
  });
}

// RENDER TIMES 4 par 4
function renderTimes(times) {
  const pages = [];
  for (let i=0; i<times.length; i+=4) {
    const chunk = times.slice(i,i+4);
    const page = `<div class="times-page${i===0?' active':''}">` +
      chunk.map(t => `<button class="time ${t.status}">${t.hour}</button>`).join("") +
      `</div>`;
    pages.push(page);
  }
  return pages.join("");
}

// ===== SLIDER TIMES =====
function slideTimes(btn, dir) {
  const wrapper = btn.parentElement.querySelector(".slider");
  const pages = wrapper.querySelectorAll(".times-page");
  let current = Array.from(pages).findIndex(p => p.classList.contains("active"));
  pages[current].classList.remove("active");
  current += dir;
  if(current < 0) current = pages.length-1;
  if(current >= pages.length) current = 0;
  pages[current].classList.add("active");
}

// ===== FILTRAGE =====
const specialityFilter = document.getElementById("specialityFilter");
const availabilityFilter = document.getElementById("availabilityFilter");

function applyFilters() {
  const specialityValue = specialityFilter.value;
  const availabilityValue = availabilityFilter.value;

  document.querySelectorAll(".doctor-card").forEach(card => {
    const matchSpeciality = specialityValue === "all" || card.dataset.cat === specialityValue;
    const matchAvailability = availabilityValue === "all" || card.dataset.availability === availabilityValue;
    card.style.display = (matchSpeciality && matchAvailability) ? "block" : "none";
  });
}

specialityFilter.addEventListener("change", applyFilters);
availabilityFilter.addEventListener("change", applyFilters);
