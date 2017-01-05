# Responsive images

##

```html
<picture>
  <source media="(max-width: 480px)" srcset="300.jpg">
  <source media="(max-width: 767px)" srcset="470.jpg">
  <source media="(max-width: 1024px)" srcset="800.jpg">
  <img src="1000.jpg" alt="Le chat">
</picture>
```

## Polyfill

* http://scottjehl.github.io/picturefill/
