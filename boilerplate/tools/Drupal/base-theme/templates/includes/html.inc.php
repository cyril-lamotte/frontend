<?php


/**
  * Implements hook_preprocess_html
  */
function pasteur_preprocess_html(&$vars) {

  // Add viewport metatag
  $meta = array(
    '#tag' => 'meta',
    '#attributes' => array(
      'name' => 'viewport',
      'content' => 'width=device-width, initial-scale=1.0',
    )
  );

  drupal_add_html_head($meta, 'viewport');


  // Add format-detection metatag
  $meta = array(
    '#tag' => 'meta',
    '#attributes' => array(
      'name' => 'format-detection',
      'content' => 'telephone=no',
    )
  );

  drupal_add_html_head($meta, 'format-detection');

}



/*
 * Implements hook_html_head_ater
 */
function pasteur_html_head_alter(&$head_elements) {

  // Remove meta generator tag
  unset($head_elements['system_meta_generator']);
  unset($head_elements['metatag_generator_0']); // Generated by metatag module

  // HTML5 Metatags syntax
  $head_elements['system_meta_content_type']['#attributes'] = array(
    'charset' => 'utf-8'
  );
}




/**
 * Implements hook_js_alter().
 * Change JS inclusion order & position
 */
function pasteur_js_alter(&$javascript) {

  $theme_path = drupal_get_path('theme', 'pasteur');


  // Modernizr should be the first loaded script
  $javascript[$theme_path .'/assets/js/lib/modernizr.js']['group'] = -500;


  // Move scripts to the footer for better performances
  $scriptsFooter = array(
    $theme_path .'/assets/js/plugins/dev/jquery.equalize.js',
    $theme_path .'/assets/js/plugins/contrib/position.min.js',
    //$theme_path .'/assets/js/plugins/contrib/jquery.colorbox-min.js',
    //$theme_path .'/assets/js/plugins/dev/jquery.dropDownNav.js',
    //$theme_path .'/assets/js/plugins/dev/jquery.popPanel.js',
    //$theme_path .'/assets/js/plugins/dev/jquery.togglePanel.js',
    $theme_path .'/assets/js/app.init.js',
    $theme_path .'/assets/js/app.responsive.js',
    $theme_path .'/assets/js/app.ui.js',
    $theme_path .'/assets/js/app.ui.utils.js',
    $theme_path .'/assets/js/app.domready.js'
  );

  foreach ($scriptsFooter as $path) {
    if (isset($javascript[$path])) {
      $javascript[$path]['scope'] = 'footer';
    }
  }

  //var_dump($javascript);
}



/**
 * Implements hook_css_alter().
 * Remove CSS
 */
function pasteur_css_alter(&$css) {

  $unset = array(
    'modules/system/system.menus.css',
    'modules/system/system.theme.css',
    'modules/search/search.css',
    //drupal_get_path('module', 'lexicon') . '/css/lexicon.css'
  );

  foreach ($unset as $path) {
    if (isset($css[$path])) {
      unset( $css[$path] );
    }
  }

  //kpr($css);
}