const garages = [
  {
    id: 1, name: "Garage Auto Plus", speciality: "Réparation & Mécanique", city: "Casablanca",
    rating: 4.8, verified: true, available: true, price: 200, category: "réparation",
    availability: "today", avatar: "GA",
    services: ["Réparation moteur", "Vidange", "Pneus", "Diagnostic"],
    days: ["Aujourd'hui","Demain","Autre"],
    times: [
      { slots:[{ time:"08:00", status:"available"},{ time:"09:00", status:"available"},{ time:"10:00", status:"reserved"},{ time:"11:00", status:"available"}]},
      { slots:[{ time:"14:00", status:"available"},{ time:"15:00", status:"available"},{ time:"16:00", status:"reserved"},{ time:"17:00", status:"available"}]}
    ]
  },
  {
    id: 2, name: "Garage Express", speciality: "Entretien & Révision", city: "Rabat",
    rating: 4.6, verified: true, available: true, price: 150, category: "entretien",
    availability: "today", avatar: "GE",
    services: ["Contrôle technique", "Révision", "Climatisation", "Vidange"],
    days: ["Aujourd'hui","Demain","Autre"],
    times: [
      { slots:[{ time:"08:30", status:"available"},{ time:"09:30", status:"available"},{ time:"10:30", status:"reserved"},{ time:"11:30", status:"available"}]},
      { slots:[{ time:"14:30", status:"available"},{ time:"15:30", status:"reserved"},{ time:"16:30", status:"available"},{ time:"17:30", status:"available"}]}
    ]
  },
  {
    id: 3, name: "Garage Pro", speciality: "Carrosserie & Peinture", city: "Marrakech",
    rating: 4.9, verified: true, available: true, price: 250, category: "réparation",
    availability: "week", avatar: "GP",
    services: ["Carrosserie", "Peinture", "Mécanique générale", "Soudure"],
    days: ["Aujourd'hui","Demain","Autre"],
    times: [
      { slots:[{ time:"09:00", status:"available"},{ time:"10:00", status:"available"},{ time:"11:00", status:"available"},{ time:"12:00", status:"reserved"}]},
      { slots:[{ time:"14:00", status:"available"},{ time:"15:00", status:"available"},{ time:"16:00", status:"available"},{ time:"17:00", status:"reserved"}]}
    ]
  },
  {
    id: 4, name: "Garage Rapide", speciality: "Service Express", city: "Fès",
    rating: 4.7, verified: true, available: true, price: 180, category: "entretien",
    availability: "today", avatar: "GR",
    services: ["Vidange express", "Batterie", "Freinage", "Éclairage"],
    days: ["Aujourd'hui","Demain","Autre"],
    times: [
      { slots:[{ time:"08:00", status:"available"},{ time:"09:00", status:"reserved"},{ time:"10:00", status:"available"},{ time:"11:00", status:"available"}]},
      { slots:[{ time:"14:00", status:"available"},{ time:"15:00", status:"available"},{ time:"16:00", status:"reserved"},{ time:"17:00", status:"available"}]}
    ]
  }
];

// ===== UTIL =====
function capitalize(str){ return str.charAt(0).toUpperCase()+str.slice(1); }

// ===== RENDER GARAGES =====
function renderGarages(data){
  const container = document.getElementById("garages-list");
  if (!container) return;
  
  container.innerHTML = "";

  data.forEach(garage=>{
    const article=document.createElement("article");
    article.className="garage-card";
    article.dataset.cat=garage.category;
    article.dataset.availability=garage.availability;

    article.innerHTML=`
      <div class="garage-header">
        <div class="garage-avatar">${garage.avatar}</div>
        <div class="garage-info">
          <h3>${garage.name}</h3>
          <p>${garage.speciality} · ${garage.city}</p>
          <div class="garage-meta">
            <span class="rating">⭐ ${garage.rating}</span>
            ${garage.verified?'<span class="badge verified">✔ Vérifié</span>':''}
            <span class="badge ${garage.available?"available":"unavailable"}">${garage.available?"Disponible":"Indisponible"}</span>
          </div>
        </div>
        <button class="fav-btn" aria-label="Ajouter aux favoris"><i data-lucide="heart"></i></button>
      </div>

      <div class="garage-services">
        <h4>Services proposés :</h4>
        <div class="services-tags">
          ${garage.services.map(s => `<span class="service-tag">${s}</span>`).join("")}
        </div>
      </div>

      <div class="garage-actions">
        <div class="days">
          ${garage.days.map((d,i)=>`<button class="day ${i===0?'active':''}"><span>${d}</span></button>`).join("")}
        </div>
        <div class="times-wrapper">
          <button class="nav prev" aria-label="Précédent">‹</button>
          <div class="times">
            ${garage.times.map((page,i)=>`<div class="times-page ${i===0?'active':''}">${page.slots.map(s=>`<button class="time ${s.status}" ${s.status === 'reserved' ? 'disabled' : ''}>${s.time}</button>`).join("")}</div>`).join("")}
          </div>
          <button class="nav next" aria-label="Suivant">›</button>
        </div>
      </div>

      <div class="garage-footer">
        <span class="price">À partir de : <strong>${garage.price} DH</strong></span>
        <button class="reserve-btn"><span>Prendre rendez-vous</span></button>
      </div>
    `;

    container.appendChild(article);
  });

  attachEvents();
}

// ===== EVENTS =====
function attachEvents(){
  // favoris
  document.querySelectorAll(".fav-btn").forEach(btn=>{
    btn.addEventListener("click",(e)=>{
      e.preventDefault();
      btn.classList.toggle("fav-active");
      if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
      } else if (typeof lucide !== 'undefined' && lucide.replace) {
        lucide.replace();
      }
    });
  });
  
  // Initialiser Lucide Icons
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  } else if (typeof lucide !== 'undefined' && lucide.replace) {
    lucide.replace();
  }

  // jours
  document.querySelectorAll(".day").forEach(btn=>btn.addEventListener("click",()=>{
    btn.parentElement.querySelectorAll(".day").forEach(d=>d.classList.remove("active"));
    btn.classList.add("active");
  }));

  // slider temps
  document.querySelectorAll(".nav").forEach(btn=>{
    btn.addEventListener("click",()=>{
      const garageCard = btn.closest(".garage-card");
      const wrapper = garageCard.querySelector(".times");
      const pages = wrapper.querySelectorAll(".times-page");
      if (pages.length === 0) return;
      
      let current = Array.from(pages).findIndex(p=>p.classList.contains("active"));
      if (current === -1) current = 0;
      
      pages[current].classList.remove("active");
      current = btn.classList.contains("prev") ? (current - 1 < 0 ? pages.length - 1 : current - 1) : (current + 1 >= pages.length ? 0 : current + 1);
      pages[current].classList.add("active");
    });
  });

  // selection temps
  document.querySelectorAll(".time").forEach(btn=>btn.addEventListener("click",()=>{
    if(btn.classList.contains("reserved")) return;
    btn.parentElement.querySelectorAll(".time").forEach(t=>t.classList.remove("active"));
    btn.classList.add("active");
  }));

  // reserver
  document.querySelectorAll(".reserve-btn").forEach(btn=>{
    btn.addEventListener("click",()=>{
      // Rediriger directement vers la page de rendez-vous
      window.location.href = 'tst.html';
    });
  });
}

// ===== FILTRES =====
const specialityFilter = document.getElementById("specialityFilter");
const availabilityFilter = document.getElementById("availabilityFilter");

if (specialityFilter && availabilityFilter) {
  specialityFilter.addEventListener("change",applyFilters);
  availabilityFilter.addEventListener("change",applyFilters);
}

function applyFilters(){
  const spec=document.getElementById("specialityFilter")?.value || "all";
  const avail=document.getElementById("availabilityFilter")?.value || "all";
  document.querySelectorAll(".garage-card").forEach(card=>{
    const show=(spec==="all"||card.dataset.cat===spec)&&(avail==="all"||card.dataset.availability===avail);
    card.style.display=show?"grid":"none";
  });
}

// ===== INIT =====
renderGarages(garages);