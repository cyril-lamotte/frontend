  <!--Skip links-->
  <nav id="skip-links" class="skip-links">
    <ul>
      <li><a href="#a_nav">Aller au menu</a></li>
      <li><a href="#a_content">Aller au contenu principal</a></li>
      <li><a href="#a_search">Aller à la recherche</a></li>
    </ul>
  </nav>


  <header class="main-header" role="banner">
    <div class="main-header__inner">

      <?php if ($front_page) : ?>
      <h1 class="main-title visually-hidden">Ademe</h1>
      <?php endif; ?>

      <?php if ($logo): ?>
        <div class="header__logo-wrapper">
          <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home">
            <img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" />
          </a>
        </div>
      <?php endif; ?>

      <div class="header__lang">
        <?php
          // Display lang switcher
          $block = module_invoke('ademe_pad_language_switcher', 'block_view', 'ademe_pad_language_switcher');
          print render($block['content']);
        ?>
      </div><!--/header__lang-->

      <button type="button" class="nav__burger"><span class="burger__icon"></span> <span class="burger__text">Menu</span></button>

	    <?php print render($page['header']); ?>

    </div><!--/main-header__inner-->
  </header>
