<?php


/* Contact */
/*
function ademe_pad_field__field_contact_email($variables) {
  return field_value($variables);
}
*/






function field_default($variables) {
  $output = '';

  // Render the label, if it's not hidden.
  if ( ! $variables['label_hidden']) {
    $output .= '<div class="field-label">' . $variables['label'] . '</div>';
  }

  foreach ($variables['items'] as $delta => $item) {
    $output .= '<div class="field-data">' . drupal_render($item) . '</div>';
  }

  $output = '<div class="' . $variables['field_name_css'] . '">' . $output . '</div>';

  // Debug comment
  $variables['debug']['output'] = $output;
  $variables['debug']['function'] = __FUNCTION__;

  $output = debug_comment($variables);

  return $output;
}



/**
  * Field theme "value"
  * Show the field value with a wrapper and his label if exists
  */
function field_value($variables) {
  $output = '';

  // Render the label, if it's not hidden.
  if ( ! $variables['label_hidden']) {
    $output .= '<div class="field-label">' . $variables['label'] . '</div>';
  }

  foreach ($variables['items'] as $delta => $item) {
    $output .= drupal_render($item);
  }

  $tag = 'div';
  if( isset($variables['tag']) )
    $tag = $variables['tag'];

  $output = '<'. $tag .' class="' . $variables['field_name_css'] . '">' . $output . '</'. $tag .'>';

  // Debug comment
  $variables['debug']['output'] = $output;
  $variables['debug']['function'] = __FUNCTION__;

  $output = debug_comment($variables);

  return $output;
}





/**
  * Field theme "definition"
  * Show the field value with a wrapper and his label if exists
  */
function field_definition($variables) {
  $output = '';

  // Render the label, if it's not hidden.
  if ( ! $variables['label_hidden']) {
    $output .= '<dt class="field-label field-label-'. $variables['field_name_css'] .'">' . $variables['label'] . '&nbsp;:</dt>';
  }


  $items = '';
  foreach ($variables['items'] as $delta => $item) {
    $items .= drupal_render($item);
  }

  if( ! $items )
    return '';


  $output .= '<dd class="' . $variables['field_name_css'] . '">' . $items . '</dd>';



  // Debug comment
  $variables['debug']['output'] = $output;
  $variables['debug']['function'] = __FUNCTION__;

  $output = debug_comment($variables);

  return $output;
}





/**
  * Add theming comment
  */
function debug_comment($variables) {

  $output = $variables['debug']['output'];
  $function = $variables['debug']['function'];

  $suggest = '';
/*  if (!empty($variables['theme_hook_suggestions'])) {
    $current_template = basename($template_file);
    $suggestions = $variables['theme_hook_suggestions'];
    // Only add the original theme hook if it wasn't a directly called
    // suggestion.
    if (strpos($variables['theme_hook_original'], '__') === FALSE) {
      $suggestions[] = $variables['theme_hook_original'];
    }
    foreach ($suggestions as &$suggestion) {
      $template = strtr($suggestion, '_', '-') . $extension;
      $prefix = ($template == $current_template) ? 'x' : '*';
      $suggestion = $prefix . ' ' . $template;
    }
    $suggest .= "\n<!-- FILE NAME SUGGESTIONS:\n   " . check_plain(implode("\n   ", $suggestions)) . "\n-->";
  }
*/
  if (variable_get('theme_debug', FALSE)) {
    return sprintf('%s<!--OUTPUT from function \'%s()\' in \'%s\'-->%s<!--/OUTPUT-->', $suggest, $function, basename(__FILE__), $output);
  }

  return $output;
}
