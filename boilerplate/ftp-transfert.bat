@echo off

echo.
echo  Transferer par FTP avec WinSCP
echo  ==============================
echo.


:: Variables de connexion
set host=sftp://editorial:editorial@10.10.10.118
set target=maquettes/maquette3
set source=L:\L141_maquettage\Integration\2014\Dicod\www\maquette
set ftpscript=L:\L141_maquettage\Integration\_github\frontend\batch\Transferer-par-FTP\ftp-transferer.txt

:: Affichage des parametres
echo  Serveur : %host%
echo   Source : %source%
echo    Cible : %target%
echo.


:: Lancement de Winscp...
winscp /script=%ftpscript% /parameter %host% %target% %source%


pause
