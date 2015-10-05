@echo off

echo.
echo  Drush - Enable devel and devel_themer
echo  =====================================
echo.

color f0

@ECHO Command Prompt shell optimized for Drush
@SET PATH=%PATH%;C:\ProgramData\Drush\
@SET PATH=%PATH%;D:\Drush\GnuWin32\bin
@SET PATH=%PATH%;D:\Drush\Php

cd ..\..\..\default
echo %cd%

drush en -y devel && drush en -y simplehtmldom && drush en -y devel_themer pause
