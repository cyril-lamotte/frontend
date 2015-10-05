@echo off

echo.
echo  Drush - Launch Solr index
echo  =========================
echo.

color f0

@ECHO Command Prompt shell optimized for Drush
@SET PATH=%PATH%;C:\ProgramData\Drush\
@SET PATH=%PATH%;D:\Drush\GnuWin32\bin
@SET PATH=%PATH%;D:\Drush\Php

cd ..\..\..\..\cdc.local
echo %cd%

drush solr-delete-index && drush solr-mark-all && drush --uri=http://cdc.local solr-index && pause


