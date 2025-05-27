const nodemailer = require('nodemailer');
const { getEmailConfig } = require('./config');

function envoyerEmail(destinataire, prenom) {
  const config = getEmailConfig(); // ✅ Récupération ici

  if (!config || !config.email || !config.password) {
    console.error("Configuration email manquante.");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.email,
      pass: config.password
    }
  });

  const mailOptions = {
    from: `"Consultations" <${config.email}>`,
    to: destinataire,
    subject: 'Merci pour votre consultation',
    text: `Bonjour ${prenom},\n\nMerci pour votre venue !\n\nBien cordialement.`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Erreur lors de l’envoi de l’email :', err);
    } else {
      console.log('Email envoyé :', info.response);
    }
  });
}

module.exports = { envoyerEmail };
