@echo off

echo.
echo  SASS/Compass : Ecoute du dossier
echo  ================================
echo.

echo  Dossier : %1


:: Lancement de sass/compass
cd %1
echo %cd%
compass watch .

pause