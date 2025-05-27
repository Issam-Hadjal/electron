const form = document.getElementById('consultation-form');
const patientsList = document.getElementById('patients-list');

async function refreshPatients() {
    const patients = await window.versions.getPatients();
    patientsList.innerHTML = ''; // Vide la liste
    patients.forEach(p => {
        const li = document.createElement('li');
        li.textContent = `${p.nom} ${p.prenom} - ${p.email} (${p.date_consultation})`;
        patientsList.appendChild(li);
    });
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const email = document.getElementById('email').value;
    const date = document.getElementById('date').value;

    await window.versions.ajouterPatient(nom, prenom, email, date);
    form.reset();
    await refreshPatients(); // Recharge la liste après ajout
});

refreshPatients(); // Recharge au démarrage
