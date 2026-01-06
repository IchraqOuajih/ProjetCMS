const doctors = [
  {
    id: 1, name: "Dr Hamid EL HARTI", speciality: "Cardiologie", city: "Casablanca",
    rating: 4.8, verified: true, available: true, price: 150, category: "coeur",
    availability: "today", avatar: "HE",
    days: ["Aujourd’hui","Demain","Autre"],
    times: [
      { slots:[{ time:"09:00", status:"available"},{ time:"09:30", status:"available"},{ time:"10:00", status:"reserved"},{ time:"10:30", status:"available"}]},
      { slots:[{ time:"11:00", status:"available"},{ time:"11:30", status:"reserved"},{ time:"12:00", status:"available"},{ time:"12:30", status:"available"}]}
    ]
  },
  {
    id: 2, name: "Dr Amina LAMRANI", speciality: "Orthopédie", city: "Rabat",
    rating: 4.6, verified: true, available: true, price: 130, category: "os",
    availability: "today", avatar: "AL",
    days: ["Aujourd’hui","Demain","Autre"],
    times: [
      { slots:[{ time:"08:30", status:"available"},{ time:"09:00", status:"available"},{ time:"09:30", status:"reserved"},{ time:"10:00", status:"available"}]},
      { slots:[{ time:"10:30", status:"available"},{ time:"11:00", status:"reserved"},{ time:"11:30", status:"available"},{ time:"12:00", status:"available"}]}
    ]
  }
];

// ===== UTIL =====
function capitalize(str){ return str.charAt(0).toUpperCase()+str.slice(1); }

// ===== RENDER DOCTORS =====
function renderDoctors(data){
  const container = document.getElementById("doctors-list");
  container.innerHTML = "";

  data.forEach(doctor=>{
    const article=document.createElement("article");
    article.className="doctor-card";
    article.dataset.cat=doctor.category;
    article.dataset.availability=doctor.availability;

    article.innerHTML=`
      <div class="doctor-main">
        <div class="doctor-avatar">${doctor.avatar}</div>
        <div class="doctor-info">
          <h3>${doctor.name}</h3>
          <p>${doctor.speciality} · ${doctor.city}</p>
          <div class="doctor-meta">
            <span class="rating">⭐ ${doctor.rating}</span>
            ${doctor.verified?'<span class="badge verified">✔ Vérifié</span>':''}
            <span class="badge ${doctor.available?"available":"unavailable"}">${doctor.available?"Disponible":"Indisponible"}</span>
          </div>
        </div>
        <button class="fav-btn" title="Ajouter aux favoris">❤</button>
      </div>

      <div class="doctor-actions">
        <div class="days">
          ${doctor.days.map((d,i)=>`<button class="day ${i===0?'active':''}">${d}</button>`).join("")}
        </div>
        <div class="times-wrapper">
          <button class="nav prev">‹</button>
          <div class="times">
            ${doctor.times.map((page,i)=>`<div class="times-page ${i===0?'active':''}">${page.slots.map(s=>`<button class="time ${s.status}">${s.time}</button>`).join("")}</div>`).join("")}
          </div>
          <button class="nav next">›</button>
        </div>
      </div>

      <div class="doctor-footer">
        <span class="price">Consultation : <strong>${doctor.price} DH</strong></span>
        <button class="reserve-btn">Prendre rendez-vous</button>
      </div>
    `;

    container.appendChild(article);
  });

  attachEvents();
}

// ===== EVENTS =====
function attachEvents(){
  // favoris
  document.querySelectorAll(".fav-btn").forEach(btn=>btn.addEventListener("click",()=>btn.classList.toggle("fav-active")));

  // jours
  document.querySelectorAll(".day").forEach(btn=>btn.addEventListener("click",()=>{
    btn.parentElement.querySelectorAll(".day").forEach(d=>d.classList.remove("active"));
    btn.classList.add("active");
  }));

  // slider temps
  document.querySelectorAll(".nav").forEach(btn=>{
    btn.addEventListener("click",()=>{
      const pages=btn.parentElement.querySelectorAll(".times-page");
      let current=[...pages].findIndex(p=>p.classList.contains("active"));
      pages[current].classList.remove("active");
      current=btn.classList.contains("prev")?(current-1<0?pages.length-1:current-1):(current+1>=pages.length?0:current+1);
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
      const card=btn.closest(".doctor-card");
      const doctorName=card.querySelector("h3").textContent;
      const selectedTime=card.querySelector(".time.active")?.textContent||"Non sélectionné";
      alert(`Rendez-vous pris avec ${doctorName} à ${selectedTime} !`);
    });
  });
}

// ===== FILTRES =====
document.getElementById("specialityFilter").addEventListener("change",applyFilters);
document.getElementById("availabilityFilter").addEventListener("change",applyFilters);
function applyFilters(){
  const spec=document.getElementById("specialityFilter").value;
  const avail=document.getElementById("availabilityFilter").value;
  document.querySelectorAll(".doctor-card").forEach(card=>{
    const show=(spec==="all"||card.dataset.cat===spec)&&(avail==="all"||card.dataset.availability===avail);
    card.style.display=show?"block":"none";
  });
}

// ===== INIT =====
renderDoctors(doctors);
