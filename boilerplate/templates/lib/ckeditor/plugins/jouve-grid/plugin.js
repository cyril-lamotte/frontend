CKEDITOR.plugins.add( 'jouve-grid', {
    lang: 'fr',
    requires: 'widget',
    icons: 'jouve-grid',

    init: function( editor ) {

      // Get locale
      var lang = editor.lang['jouve-grid'];
      commonLang = editor.lang.common;

      editor.ui.addButton('jouve-grid', {
          label: lang.insertGrid,
          command : 'jouve-grid',
          icon : this.path +'icons/jouve-grid.png'
      });

      // Add CSS
      editor.addContentsCss( this.path + 'styles/jouve-grid.css' );

      // Add dialog
      CKEDITOR.dialog.add( 'jouve-grid', this.path + 'dialogs/jouve-grid.js' );


      editor.widgets.add( 'jouve-grid', {
          defaults: {
            colsCount: 2,
            rowsCount: 1,
            padding: false
          },
          button: lang.insertGrid,

          allowedContent:
            'div(!jouve-grid, jouve-grid-1, jouve-grid-2, jouve-grid-3, jouve-grid-4, jouve-grid-5, jouve-grid-6, jouve-grid-padding);' +
            'div(!jouve-grid-item-content);' +
            'div(!jouve-grid-item);',
          requiredContent: 'div(jouve-grid);',

          template:
            '<div class="jouve-grid"></div>',

          editables: {
            content: ''
          },

          upcast: function( element ) {
            return element.name == 'div' && element.hasClass( 'jouve-grid' );
          },

          dialog: 'jouve-grid',


          init: function() {

            // Block double click
            this.on( 'doubleclick', function( evt ) {
                this.dialog = '';
            }, null, null, 5 );

            // Default values
            var colsCount = this.defaults.colsCount;
            var rowsCount = this.defaults.rowsCount;
            var padding   = this.defaults.padding;

            // Get HTML settings
            for(var c = 1; c <= 10; c++) {
              if ( this.element.hasClass( 'jouve-grid-'+ c ) )
              {
                colsCount = c;
                break;
              }
            }


            // Calculate the number of lines
            var current_cells_count = this.element.getChildCount();
            if ( this.element.find( 'jouve-grid-item' ) )
            {
              if(current_cells_count !== 0)
                rowsCount = current_cells_count / colsCount;
            }



            this.setData( 'padding', padding );
            this.setData( 'colsCount', colsCount );
            this.setData( 'rowsCount', rowsCount );

            // Create editable zone
            this.createEditable( colsCount * rowsCount );

          },


          data: function() {

            var cellList = this.element.getChildren();
            var current_cells_count = this.element.getChildCount();
            var new_cells_count = this.data.colsCount * this.data.rowsCount; // Calculate the number of cells to create

            // Remove old classes
            for(var old_c = 1; old_c <= 10; old_c++) {
              this.element.removeClass( 'jouve-grid-'+ old_c );
            }



            // Add cols number class
            if ( this.data.colsCount ) {
              this.element.addClass( 'jouve-grid-' + this.data.colsCount );

              // Add padding class
              if( this.data.padding )
                this.element.addClass( 'jouve-grid-padding' );
            }



            // Create cells
            if(current_cells_count <= new_cells_count) {

              for(var i = 1 + current_cells_count; i <= new_cells_count; i++) {
                this.element.appendHtml('<div class="jouve-grid-item"><div class="jouve-grid-item-content"></div></div>');

                // Update editables
                this.createEditable(new_cells_count);
              }

            }
            else {

              // Remove cells
              for(j = 0+new_cells_count; j < current_cells_count; j++) {

                if( cellList.getItem(j) )
                {
                  cellList.getItem(j).remove();
                }

              }

            }



          },


          createEditable: function(cellsCount) {

            for (var i = 1; i <= cellsCount; i++) {
              this.initEditable('content_'+ i, {
                selector: '.jouve-grid > div:nth-child('+ i +') > div'
              });
            }

          }

      } );



    }
} );
