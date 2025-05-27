# Script PowerShell : unzip-and-run.ps1

$zipPath = Join-Path $PSScriptRoot "my-electron-app.zip"
$extractTo = Join-Path $PSScriptRoot "my-electron-app"

# Débloquer le zip
if (Test-Path $zipPath) {
    Write-Host "🔓 Déblocage du fichier $zipPath..."
    Unblock-File -Path $zipPath
} else {
    Write-Error "❌ Le fichier .zip n'a pas été trouvé."
    exit
}

# Extraire le zip
if (Test-Path $extractTo) {
    Write-Host "🗑️ Dossier déjà existant. Suppression..."
    Remove-Item $extractTo -Recurse -Force
}
Write-Host "📦 Extraction vers $extractTo..."
Expand-Archive -Path $zipPath -DestinationPath $extractTo

# Lancer l'exécutable
$exePath = Join-Path $extractTo "my-electron-app.exe"
if (Test-Path $exePath) {
    Write-Host "🚀 Lancement de l'application..."
    Start-Process $exePath
} else {
    Write-Warning "⚠️ L'application .exe n'a pas été trouvée."
}
