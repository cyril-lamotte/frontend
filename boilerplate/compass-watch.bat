@echo off

echo.
echo  SASS/Compass : Watch
echo  ====================
echo.

:: Lancement de sass/compass
cd assets

echo %cd%

compass watch .

pause
