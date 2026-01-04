document.getElementById("searchDoc").addEventListener("input", function() {
  const query = this.value.toLowerCase();
  document.querySelectorAll('.doc-card').forEach(card => {
    const name = card.querySelector('h3').innerText.toLowerCase();
    const specialty = card.querySelector('p').innerText.toLowerCase();
    card.style.display = name.includes(query) || specialty.includes(query) ? 'block' : 'none';
  });
});
