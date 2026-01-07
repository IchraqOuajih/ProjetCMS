const coiffeurs = [
  {
    id: 1, name: "Salon Lina", speciality: "Coupe & Coiffure", city: "Casablanca",
    rating: 4.7, verified: true, available: true, price: 80, category: "coupe",
    availability: "today", avatar: "SL",
    days: ["Aujourd'hui","Demain","Autre"],
    times: [
      { slots:[{ time:"09:00", status:"available"},{ time:"09:30", status:"available"},{ time:"10:00", status:"available"},{ time:"10:30", status:"reserved"}]},
      { slots:[{ time:"11:00", status:"available"},{ time:"11:30", status:"reserved"},{ time:"14:00", status:"available"},{ time:"14:30", status:"available"}]}
    ]
  },
  {
    id: 2, name: "Salon Beauty", speciality: "Coloration & Soins", city: "Rabat",
    rating: 4.9, verified: true, available: true, price: 120, category: "coloration",
    availability: "today", avatar: "SB",
    days: ["Aujourd'hui","Demain","Autre"],
    times: [
      { slots:[{ time:"08:00", status:"available"},{ time:"08:30", status:"available"},{ time:"09:00", status:"reserved"},{ time:"09:30", status:"available"}]},
      { slots:[{ time:"10:00", status:"available"},{ time:"10:30", status:"reserved"},{ time:"15:00", status:"available"},{ time:"15:30", status:"available"}]}
    ]
  },
  {
    id: 3, name: "Salon Elegance", speciality: "Coupe & Brushing", city: "Marrakech",
    rating: 4.6, verified: true, available: true, price: 90, category: "coupe",
    availability: "week", avatar: "SE",
    days: ["Aujourd'hui","Demain","Autre"],
    times: [
      { slots:[{ time:"10:00", status:"available"},{ time:"10:30", status:"available"},{ time:"11:00", status:"available"},{ time:"11:30", status:"reserved"}]},
      { slots:[{ time:"14:00", status:"available"},{ time:"14:30", status:"available"},{ time:"15:00", status:"reserved"},{ time:"15:30", status:"available"}]}
    ]
  }
];

// ===== UTIL =====
function capitalize(str){ return str.charAt(0).toUpperCase()+str.slice(1); }

// ===== FONCTION DE REDIRECTION VERS PAGE DE RENDEZ-VOUS =====
function redirectToAppointmentPage(appointmentData) {
  try {
    // Stocker les données dans localStorage
    localStorage.setItem('appointmentData', JSON.stringify(appointmentData));
    
    // Rediriger vers la page de rendez-vous
    window.location.href = 'tst.html';
    
    // Alternative si besoin d'une redirection forcée
    // window.location.replace('./tst.html');
  } catch (error) {
    console.error("Erreur lors de la redirection:", error);
    alert("Une erreur est survenue lors de la redirection. Veuillez réessayer.");
  }
}

// ===== RENDER COIFFEURS =====
function renderCoiffeurs(data){
  const container = document.getElementById("coiffeurs-list");
  if (!container) return;
  
  container.innerHTML = "";

  data.forEach(coiffeur=>{
    const article=document.createElement("article");
    article.className="doctor-card";
    article.dataset.cat=coiffeur.category;
    article.dataset.availability=coiffeur.availability;

    article.innerHTML=`
      <div class="doctor-main">
        <div class="doctor-avatar">${coiffeur.avatar}</div>
        <div class="doctor-info">
          <h3>${coiffeur.name}</h3>
          <p>${coiffeur.speciality} · ${coiffeur.city}</p>
          <div class="doctor-meta">
            <span class="rating">⭐ ${coiffeur.rating}</span>
            ${coiffeur.verified?'<span class="badge verified">✔ Vérifié</span>':''}
            <span class="badge ${coiffeur.available?"available":"unavailable"}">${coiffeur.available?"Disponible":"Indisponible"}</span>
          </div>
        </div>
        <button class="fav-btn" aria-label="Ajouter aux favoris"><i data-lucide="heart"></i></button>
      </div>

      <div class="doctor-actions">
        <div class="days">
          ${coiffeur.days.map((d,i)=>`<button class="day ${i===0?'active':''}"><span>${d}</span></button>`).join("")}
        </div>
        <div class="times-wrapper">
          <button class="nav prev" aria-label="Précédent">‹</button>
          <div class="times">
            ${coiffeur.times.map((page,i)=>`<div class="times-page ${i===0?'active':''}">${page.slots.map(s=>`<button class="time ${s.status}" ${s.status === 'reserved' ? 'disabled' : ''}>${s.time}</button>`).join("")}</div>`).join("")}
          </div>
          <button class="nav next" aria-label="Suivant">›</button>
        </div>
      </div>

      <div class="doctor-footer">
        <span class="price">Prestation : <strong>${coiffeur.price} DH</strong></span>
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
      // Initialiser Lucide Icons après le toggle
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
      const coiffeurCard = btn.closest(".doctor-card");
      const wrapper = coiffeurCard.querySelector(".times");
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

  // reserver - Gestion du clic sur le bouton "Prendre rendez-vous"
  document.querySelectorAll(".reserve-btn").forEach(btn=>{
    btn.addEventListener("click",(e)=>{
      e.preventDefault();
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
  document.querySelectorAll(".doctor-card").forEach(card=>{
    const show=(spec==="all"||card.dataset.cat===spec)&&(avail==="all"||card.dataset.availability===avail);
    card.style.display=show?"block":"none";
  });
}

// ===== INIT =====
renderCoiffeurs(coiffeurs);