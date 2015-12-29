<!DOCTYPE html>
<html lang="<?php print $language->language; ?>">

<head>
  <!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge" /><![endif]-->
  <?php print $head; ?>

  <title><?php print $head_title; ?></title>

  <?php print $styles; ?>
  <?php print $scripts; ?>

</head>
<body class="<?php print $classes; ?>" <?php print $attributes;?>>

  <div id="top" class="outer-wrap" >
    <div id="inner-wrap" class="inner-wrap">

      <?php print $page; ?>

      <?php print theme('back-to-top'); ?>

    </div><!--/inner-wrap-->
  </div><!--/outer-wrap-->

</body>
</html>
