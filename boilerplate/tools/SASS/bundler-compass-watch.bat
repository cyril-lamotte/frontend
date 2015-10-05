@echo off

echo.
echo  Compass watch task via bundler
echo  ==============================
echo.

color f0

:: Lancement de sass/compass
echo %cd%

bundler exec compass watch .

pause
