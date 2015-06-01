@echo off

echo.
echo  Compass watch task via bundler
echo  ==============================
echo.

:: Lancement de sass/compass
echo %cd%

bundler exec compass watch .

pause
