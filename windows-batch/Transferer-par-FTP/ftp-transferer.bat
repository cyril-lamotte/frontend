@echo off

echo.
echo  Transferer par FTP avec WinSCP
echo  ==============================
echo.


:: Variables de connexion
set host=sftp://login:password@1.1.1.1
set target=dossier-distant
set source=L:\Project
set ftpscript=C:\ftp-transferer.txt

:: Affichage des parametres
echo  Serveur : %host%
echo   Source : %source%
echo    Cible : %target%
echo.


:: Lancement de Winscp...
winscp /script=%ftpscript% /parameter %host% %target% %source%


pause
