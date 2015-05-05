CKEDITOR.dialog.add( 'jouve-grid', function( editor ) {

  // Get locale
  var lang = editor.lang['jouve-grid'];
  commonLang = editor.lang.common;

  return {
    title: lang.insertGrid,
    minWidth: 200,
    minHeight: 100,
    contents: [
      {
        id: 'grid',
        elements: [
          {
            id: 'colsCount',
            type: 'select',
            label: lang.columns,
            items: [
              [ '2', 2],
              [ '3', 3],
              [ '4', 4],
              [ '5', 5]
            ],
            setup: function( widget ) {
              this.setValue( widget.data.colsCount );
            },
            commit: function( widget ) {
              widget.setData( 'colsCount', this.getValue() );
            }
          },
          {
            id: 'rowsCount',
            type: 'select',
            label: lang.rows,
            items: [
              [ '1', 2],
              [ '2', 2],
              [ '3', 3],
              [ '4', 4],
              [ '5', 5]
            ],
            setup: function( widget ) {
              this.setValue( widget.data.rowsCount );
            },
            commit: function( widget ) {
              widget.setData( 'rowsCount', this.getValue() );
            }
          }
        ]
      }
    ]
  };


} );
