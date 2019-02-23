$( document ).ready(function() {
    console.log( "ready!" );
    initData();
});

  function initData() {
    $.getJSON( "http://0.0.0.0:8000/sample.json", function( data ) {
        var posts = [];
        var topics = [];
        var users = [];
        var tags = [];
        /*$.each( data, function( key, val ) {
          items.push( "<li id='" + key + "'>" + val + "</li>" );
        });
       */
        /*$( "<ul/>", {
          "class": "my-new-list",
          html: items.join( "" )
        }).appendTo( "body" ); */
      });
  }