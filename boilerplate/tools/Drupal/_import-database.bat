@echo off

echo.
echo  Import database
echo  ===============
echo.

color f0

cd D:\wamp\bin\mysql\mysql5.6.17\bin

set database=caisse_des_depots
set dump_path=D:\www\cdc.local\www\website\drupal\sites\all\themes\custom\cdc\

mysql.exe -uroot -p %database% --default-character-set=utf8 < %dump_path%%database%.sql

echo.
cd %dump_path%
echo Path : %cd%
ren %database%.sql %database%_imported.sql
echo File renamed : %database%_imported.sql

pause
