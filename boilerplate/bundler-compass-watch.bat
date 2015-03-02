@echo off

echo.
echo  SASS/Compass : Watch
echo  ====================
echo.

:: Lancement de sass/compass
echo %cd%

bundler exec compass watch .

pause
