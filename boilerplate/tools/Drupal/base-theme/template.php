<?php

/**
 * Include common functions used through out theme.
 */
include_once dirname(__FILE__) . '/theme/common.inc';





function mytheme_preprocess_html(&$vars) {

  // Add viewport metatag
  $viewport = array(
   '#tag' => 'meta',
   '#attributes' => array(
     'name' => 'viewport',
     'content' => 'initial-scale=1.0',
   )
  );

  drupal_add_html_head($viewport, 'viewport');


  // Add format-detection metatag
  $viewport = array(
   '#tag' => 'meta',
   '#attributes' => array(
     'name' => 'format-detection',
     'content' => 'telephone=no',
   )
  );

  drupal_add_html_head($viewport, 'format-detection');


  // Add externals CSS
  //drupal_add_css('http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700', array('type' => 'external'));

}


/**
 * Declare various hook_*_alter() hooks.
 *
 * hook_*_alter() implementations must live (via include) inside this file so
 * they are properly detected when drupal_alter() is invoked.
 */
mytheme_include('mytheme', 'theme/alter.inc');
