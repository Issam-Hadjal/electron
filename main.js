const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('path');
const { ajouterPatient, getPatients } = require('./db');
const { envoyerEmail } = require('./mailer');
const { saveEmailConfig, getEmailConfig } = require('./config');

// require('update-electron-app')()
let win;

const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    })
    win.webContents.setWindowOpenHandler(({ url }) => {
        const { shell } = require('electron');
        shell.openExternal(url);
        return { action: 'deny' };
    });

    const config = getEmailConfig();
    win.loadFile(config ? 'index.html' : 'config.html');

}

app.whenReady().then(() => {
    ipcMain.handle('save-email-config', async (_e, email, password) => {
        saveEmailConfig(email, password);
        win.loadFile('index.html'); // redirige vers l'app principale après config
    });

    ipcMain.handle('get-email-config', async () => {
        return getEmailConfig();
    });

    ipcMain.handle('ajouter-patient', async (_e, nom, prenom, email, date) => {
        if (nom && prenom && email && date) {
            ajouterPatient(nom, prenom, email, date);
            // Envoi d’un email après 1 min
            setTimeout(() => {
                envoyerEmail(email, prenom);
            }, 60000);
        }
    });

    ipcMain.handle('get-patients', async () => {
        return getPatients();
    });

    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})