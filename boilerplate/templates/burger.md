# Template "burger" button

## Markup

```html
<button type="button" id="burger" class="burger" title="<?php print t('Open menu'); ?>"><span class="burger__icon"></span> <span class="burger__text">Menu</span></button>
```


## Theme

```css
/* -----------------------------------------------------------------------------
   "Burger" button
----------------------------------------------------------------------------- */

.burger {
  @include reset-box-model;
  background: none;
  width: 70px;
  float: right;
  padding: 20px;
  display: none;

  @include mq-to( 'md' ) {
    display: block;
  }

}

// Spacing between burger layouts
$burger-spacing: 11px;

.burger__icon {
  display: block;
  position: relative;
  margin: 0 auto;
  background: #000;
  height: 3px;
  margin-bottom: $burger-spacing;
  margin-top: $burger-spacing;
  transition: all 300ms;

  &:before,
  &:after {
    content: '';
    height: 3px;
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    background: #000;
    transition: all 300ms;
  }

  &:before {
    top: -$burger-spacing;
  }

  &:after {
    bottom: -$burger-spacing;
  }
}

.burger__text {
  display: none;
}
```
