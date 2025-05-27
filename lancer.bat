@echo off
:: Nom du fichier ZIP à traiter
set ZIPFILE=my-electron-app.zip
set PS_SCRIPT=unzip-and-run.ps1

:: Vérifie que PowerShell est disponible
where powershell >nul 2>&1
if errorlevel 1 (
    echo PowerShell n'est pas disponible sur ce système.
    pause
    exit /b
)

:: Lance le script PowerShell
powershell -NoProfile -ExecutionPolicy Bypass -File "%PS_SCRIPT%"
pause
