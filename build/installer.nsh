!macro customInstall
  ; Demande à l'utilisateur s'il veut un raccourci bureau
  MessageBox MB_YESNO|MB_ICONQUESTION "Créer un raccourci sur le bureau ?" IDNO noShortcut
  CreateShortCut "$DESKTOP\${PRODUCT_NAME}.lnk" "$INSTDIR\${PRODUCT_NAME}.exe"
  noShortcut:
!macroend

!macro customWelcomePage
  # Welcome Page is not added by default for installer.
  !insertMacro MUI_PAGE_WELCOME
!macroend

!macro customUnWelcomePage
  !define MUI_WELCOMEPAGE_TITLE "custom title for uninstaller welcome page"
  !define MUI_WELCOMEPAGE_TEXT "custom text for uninstaller welcome page $\r$\n more"
  !insertmacro MUI_UNPAGE_WELCOME
!macroend
