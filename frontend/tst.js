lucide.replace();
const list = document.getElementById("doctorsList");
const filter = document.getElementById("cityFilter");
let doctors = [];

fetch("data/medecins.json")
  .then(r => r.json())
  .then(data => {
    doctors = data;
    render(data);
  });

filter.addEventListener("change", () => {
  const v = filter.value;
  render(v === "all" ? doctors : doctors.filter(d => d.city === v));
});

function render(data) {
  list.innerHTML = "";
  data.forEach(d => {
    list.innerHTML += `
      <div class="doctor-card">
      <p>⭐ ${d.rating} / 5</p>
<p>🧠 ${d.experience} ans d'expérience</p>

        <h3>${d.name}</h3>
        <p>${d.speciality}</p>
        <p>📍 ${d.city}</p>
        
        <button class="reserve">Prendre rendez-vous</button>
      </div>
    `;
  });
}

lucide.replace();
