@echo off

echo.
echo  Generation de l'archive
echo  =======================
echo.

:: Date avec "-" en s�parateur ex: 2011-03-10
set fichier=%date:~6,4%-%date:~3,2%-%date:~0,2%

echo  Dossier : %1
echo    Cible : %cd%\%fichier%.zip


:: G�n�ration du zip
:: - Exclusion des r�pertoires ".svn"

7z a -tZip "%cd%\%fichier%.zip" "%1/*" -xr!.svn

echo.
echo %cd%\%fichier%.zip est cree
echo.

pause