@echo off

echo.
echo  Guard hologram
echo  ==============
echo.

color f0

:: Lancement de sass/compass
echo %cd%

bundle exec guard

pause
