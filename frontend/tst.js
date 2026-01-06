let doctors = [];

async function loadDoctors() {
  const res = await fetch('medecins.json');
  doctors = await res.json();
  displayDoctors(doctors);
}

function displayDoctors(list) {
  const container = document.getElementById('doctorsList');
  container.innerHTML = '';
  if(list.length === 0) {
    container.innerHTML = '<p>Aucun médecin trouvé</p>';
    return;
  }
  list.forEach(doc => {
    const card = document.createElement('article');
    card.className = 'doctor-card';
    card.innerHTML = `
      <div class="doctor-main">
        <div class="doctor-avatar">${doc.name.split(' ')[1][0]}${doc.name.split(' ')[2] ? doc.name.split(' ')[2][0] : ''}</div>
        <div class="doctor-info">
          <h3>${doc.name}</h3>
          <p>${doc.speciality} · ${doc.city}</p>
          <div class="doctor-meta">
            <span class="rating">⭐ ${doc.rating}</span>
            ${doc.verified ? '<span class="badge verified">✔ Vérifié</span>' : ''}
            <span class="badge available">${doc.availability === 'today' ? 'Disponible aujourd’hui' : 'Cette semaine'}</span>
          </div>
        </div>
        <button class="fav-btn" title="Ajouter aux favoris"><i data-lucide="heart"></i></button>
      </div>
      <div class="doctor-footer">
        <span>Consultation : <strong>${doc.price} DH</strong></span>
        <button class="reserve-btn">Prendre rendez-vous</button>
      </div>
    `;
    container.appendChild(card);
  });
  lucide.createIcons();
}

// FILTRAGE
document.getElementById('searchBtn').addEventListener('click', () => {
  const service = document.getElementById('searchService').value.toLowerCase();
  const city = document.getElementById('searchCity').value.toLowerCase();
  const speciality = document.getElementById('specialityFilter').value;
  const availability = document.getElementById('availabilityFilter').value;

  const filtered = doctors.filter(doc => 
    (doc.name.toLowerCase().includes(service) || doc.speciality.toLowerCase().includes(service)) &&
    (doc.city.toLowerCase().includes(city)) &&
    (speciality === 'all' || doc.speciality === speciality) &&
    (availability === 'all' || doc.availability === availability)
  );
  displayDoctors(filtered);
});

loadDoctors();
