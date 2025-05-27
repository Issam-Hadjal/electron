// db.js
const path = require('path');
const { app } = require('electron');
const Database = require('better-sqlite3');

const dbPath = path.join(app.getPath('userData'), 'consultations.db');
const db = new Database(dbPath);

// Crée la table si elle n'existe pas
db.prepare(`
  CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT,
    prenom TEXT,
    email TEXT,
    date_consultation TEXT
  )
`).run();

function ajouterPatient(nom, prenom, email, dateConsultation) {
    const stmt = db.prepare(`
    INSERT INTO patients (nom, prenom, email, date_consultation)
    VALUES (?, ?, ?, ?)
  `);
    stmt.run(nom, prenom, email, dateConsultation);
}

function getPatients() {
    return db.prepare(`SELECT * FROM patients ORDER BY date_consultation DESC`).all();
}

module.exports = { ajouterPatient, getPatients };
