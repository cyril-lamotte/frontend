<?php
/**
  * @file
  * Logo template
  *
  * Usage :
  *
  * <?php
  *   // Logo
  *   if ($logo)
  *     print theme('logo', array( 'logo' => $logo ));
  * ?>
  *
  */
?>

<div class="logo-wrap">
  <?php

    // Logo link's text
    $backToHP = sprintf('%s, %s', variable_get('site_name'), t('back to homepage'));

    // Get logo
    $logoImg = theme_image(array(
      'path' => $logo,
      'alt'  => $backToHP,
      'title'  => $backToHP,
      'attributes'  => array()
    ));

    // Image + link
    print l($logoImg, 'front', array(
      'html' => true,
      'attributes' => array(
        'class' => 'logo'
      )
    ));

  ?>
</div><!--/logo-wrap-->
