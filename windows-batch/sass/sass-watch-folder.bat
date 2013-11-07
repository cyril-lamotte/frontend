@echo off

echo.
echo  SASS : Ecoute du dossier
echo  ========================
echo.

echo  Dossier : %1
echo    Cible : %1 /scss vers /css


:: Lancement de sass
cd %1
echo %cd%
sass --style expanded --watch scss:css

pause