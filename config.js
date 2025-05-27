const fs = require('fs');
const path = require('path');
const { app } = require('electron');

const configPath = path.join(app.getPath('userData'), 'config.json');

function saveEmailConfig(email, password) {
    fs.writeFileSync(configPath, JSON.stringify({ email, password }));
}

function getEmailConfig() {
    if (fs.existsSync(configPath)) {
        return JSON.parse(fs.readFileSync(configPath));
    }
    return null;
}

module.exports = { saveEmailConfig, getEmailConfig };
