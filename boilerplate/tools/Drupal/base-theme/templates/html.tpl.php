<!DOCTYPE html>
<!--[if lte IE 7]><html lang="<?php print $language->language; ?>" class="ie7 lte-ie8"><![endif]-->
<!--[if IE 8]><html lang="<?php print $language->language; ?>" class="ie8 lte-ie8"><![endif]-->
<!--[if IE 9]><html lang="<?php print $language->language; ?>" class="ie9"><![endif]-->
<!--[if gt IE 9]><!--><html lang="<?php print $language->language; ?>"><!--<![endif]-->

<head>
  <?php print $head; ?>
  <!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge" /><![endif]-->

  <title><?php print $head_title; ?></title>

  <?php print $styles; ?>
  <?php print $scripts; ?>

  <script src="<?= path_to_theme(); ?>/assets/js/lib/modernizr.js"></script>

</head>
<body class="<?php print $classes; ?>" <?php print $attributes;?>>

  <?php print $page_top; ?>
  <?php print $page; ?>
  <?php print $page_bottom; ?>

</body>
</html>
