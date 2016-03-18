<?php

// Alter basic HTML
require_once('templates/includes/html.inc.php');

// Menu
require_once('templates/includes/menus.inc.php');

// Solr search template functions
require_once('templates/includes/solr.inc.php');

// Forms
require_once('templates/includes/forms.inc.php');

// Fields
require_once('templates/includes/fields.inc.php');




/**
  * Themes listing
  * <?php print theme('template-name'); ?>
  */
function mytheme_theme($existing, $type, $theme, $path) {

  return array(

    'header' => array(
      'template'  => 'templates/header',
      'variables' => array('home')
    ),

    'menu-principal' => array(
      'template'  => 'templates/menu-principal',
      'variables' => array()
    ),

    'footer' => array(
      'template'  => 'templates/footer',
      'variables' => array()
    ),

    'back-to-top' => array(
      'template'  => 'templates/back-to-top',
      'variables' => array()
    ),

    'home-maquette' => array(
      'template'  => 'templates/home-maquette',
      'variables' => array()
    ),

    'print' => array(
      'template'  => 'templates/print',
      'variables' => array()
    ),

    'search_form' => array(
      'render element' => 'form',
      'template'  => '/templates/search/search-form',
    ),

    'apachesolr_search_custom_page_search_form' => array(
      'render element' => 'form',
      'template'  => '/templates/search/search-form',
    ),

    'user_login' => array(
      'render element' => 'form',
      'template'  => '/templates/login/login-form',
    ),

    'user_register_form' => array(
      'render element' => 'form',
      'template'  => '/templates/login/user-register-form',
    ),

    'user_pass' => array(
      'render element' => 'form',
      'template'  => '/templates/login/user-pass-form',
    ),

  );

}




function mytheme_preprocess_page(&$vars) {

  // 404
  $header = drupal_get_http_header("status");
  if( $header == "404 Not Found" ) {
    $vars['theme_hook_suggestions'][] = 'page__error';
  }

  // 403
  if($header == "403 Forbidden") {
    $vars['theme_hook_suggestions'][] = 'page__error';
  }

}

