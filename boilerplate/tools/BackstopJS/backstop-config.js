
console.log('');
console.log('');
console.log('Comparaison des mises en page');
console.log('-----------------------------');
console.log('');
console.log('');

var id = 'projet';
var url_ref  = 'http://www.projet-reference.fr';
var url_test = 'http://site-de-text.dev';
var scenarios = [];

var url_list = [
  '/',
  '/url',
];

var scen;
url_list.forEach(function(item) {

  scen = {
    "label": item,
    "url": url_test + item,
    "referenceUrl": url_ref + item,
    "delay": 2000
  }

  scenarios.push(scen);
});




module.exports = {
  "id": id,
  "viewports": [
    {
      "name": "desktop",
      "width": 1300,
      "height": 2000
    },
    {
      "name": "phone",
      "width": 320,
      "height": 480
    },
    {
      "name": "ipad",
      "width": 768,
      "height": 1024
    },
    {
      "name": "tablet_h",
      "width": 1024,
      "height": 768
    }
  ],
  "scenarios": scenarios,
  "paths": {
    "bitmaps_reference": "backstop_data/bitmaps_reference",
    "bitmaps_test": "backstop_data/bitmaps_test",
    "casper_scripts": "backstop_data/casper_scripts",
    "html_report": "backstop_data/html_report",
    "ci_report": "backstop_data/ci_report"
  },
  "casperFlags": [],
  "engine": "phantomjs",
  "report": ["browser"],
  "debug": false
}
