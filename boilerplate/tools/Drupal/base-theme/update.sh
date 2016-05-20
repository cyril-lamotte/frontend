#!/bin/bash

#echo ""
#echo "Activer la recherche SolR..."
#sudo service solr start
#echo "-------------------------"
#echo ""

echo ""
echo "Activation des modules..."
echo "-------------------------"
echo ""

drush.bat en master -y


echo ""
echo "Application des features..."
echo "---------------------------"
echo ""

drush.bat fra -y


echo ""
echo "Configuration performances..."
echo "-----------------------------"
echo ""

# Do not group CSS & JS
drush.bat vset preprocess_css 0 --yes
drush.bat vset preprocess_js 0 --yes


echo ""
echo "Vider les caches..."
echo "-------------------"
echo ""
drush.bat cc all
