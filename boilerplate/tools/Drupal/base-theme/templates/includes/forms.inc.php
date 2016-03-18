<?php

/**
 * Login form
 */

/*
function ademe_pad_preprocess_user_login(&$variables) {

  // Shorten the form variable name for easier access.
  $form = $variables['form'];


  // Update "name"
  $form['name']['#attributes']['placeholder'] = t('Login') .' *';
  $form['name']['#attributes']['title'] = t('Login') .' *';
  unset($form['name']['#title']);
  unset($form['name']['#size']);
  unset($form['name']['#description']);


  // Update "pass"
  $form['pass']['#attributes']['placeholder'] = $form['pass']['#title'] .' *';
  $form['pass']['#attributes']['title'] = $form['pass']['#title'] .' *';
  unset($form['pass']['#title']);
  unset($form['pass']['#size']);
  unset($form['pass']['#description']);


  // Update submit
  $form['actions']['submit']['#value'] = t('Connexion');


  // Create variables for individual elements.
  $variables['login'] = render($form['name']);
  $variables['pass'] = render($form['pass']);
  $variables['links'] = render($form['links']);
  $variables['debug'] = $form;


  // Be sure to print the remaining rendered form items.
  $variables['children'] = drupal_render_children($form);

}
*/
