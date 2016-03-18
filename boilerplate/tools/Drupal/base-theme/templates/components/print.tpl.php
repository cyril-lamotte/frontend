
<?php

  // Get image
  $img = theme_image(array(
    'path' => path_to_theme() .'/assets/img/buttons/print-grey.png',
    'alt'  => t('Imprimer'),
    'title'  => t('Imprimer'),
    'attributes'  => array()
  ));

?>

<button type="button" class="btn--print"><?php print $img; ?></button>
