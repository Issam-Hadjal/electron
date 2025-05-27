const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    saveEmailConfig: (email, password) => ipcRenderer.invoke('save-email-config', email, password),
    getEmailConfig: () => ipcRenderer.invoke('get-email-config'),
    ajouterPatient: (nom, prenom, email, date) => ipcRenderer.invoke('ajouter-patient', nom, prenom, email, date),
    getPatients: () => ipcRenderer.invoke('get-patients')
})