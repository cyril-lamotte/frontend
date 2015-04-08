<?php
/**
 * @file
 * common.inc
 *
 * Contains common functionality for the entire base theme.
 */


/**
 * Helper function for including theme files.
 *
 * @param string $theme
 *   Name of the theme to use for base path.
 * @param string $path
 *   Path relative to $theme.
 */
function mytheme_include($theme, $path) {
  static $themes = array();
  if (!isset($themes[$theme])) {
    $themes[$theme] = drupal_get_path('theme', $theme);
  }
  if ($themes[$theme] && ($file = DRUPAL_ROOT . '/' . $themes[$theme] . '/' . $path) && file_exists($file)) {
    include_once $file;
  }
}

/**
 * Theme something
 *
 * @param string $my_var
 *   The icon name, minus the "glyphicon-" prefix.
 *
 * @return string
 *   HTML markup.
 */


function _mytheme_stuff($my_var) {

  $output = '';

  // Mimic the Icon API markup.
  $attributes = array(
    'class' => array('icon', 'glyphicon', 'glyphicon-' . $name),
    'aria-hidden' => 'true',
  );

  $output = '<i' . drupal_attributes($attributes) . '></i>';

  return $output;
}

