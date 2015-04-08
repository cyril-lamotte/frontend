<?php

/* -----------------------------------------------------------------------------
   Head
----------------------------------------------------------------------------- */

function drupaldemo_html_head_alter(&$head_elements) {

  // HTML5 Metatags syntax
  $head_elements['system_meta_content_type']['#attributes'] = array(
    'charset' => 'utf-8'
  );

  // Remove meta tag "generator"
  unset($head_elements['system_meta_generator']);

}


function drupaldemo_preprocess_html(&$vars) {

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


function drupaldemo_css_alter(&$css) {

  // Remove Drupal's default css
  //if (isset($css['modules/node/node.css'])) {
    //unset($css['modules/node/node.css']);
  //}

}



/* -----------------------------------------------------------------------------
   HTML tags
----------------------------------------------------------------------------- */

function drupaldemo_process_html_tag(&$vars) {
  $el = &$vars['element'];

  // HTML5 : Removes "type" attributes
  unset($el['#attributes']['type'], $el['#value_prefix'], $el['#value_suffix']);

}



