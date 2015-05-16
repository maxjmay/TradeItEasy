// IIFE - Immediately Invoked Function Expression
(function(_fct){
    // The global jQuery object is passed as a parameter
  	_fct(window.jQuery, window, document);

}(function($, window, document) {

// The $ is now locally scoped 
// Listen for the jQuery ready event on the document
  $(function(){
    
    // The DOM is ready!
    console.log("DOM is ready");

    // Caching variables
    /*
    var header = $("#header");
    var headerTop = header.offset().top;
    var win = $(window);

    win.scroll(function(){
      if(win.scrollTop() > headerTop){
        header.css({
          position: 'fixed',
          top: '0px'
        });
        //$(header+"").css({margin: '30px'});
      }
      else{
        //header.css({position: 'static'});
        //$(header .logo img').css({"margin": "30px"});
      }
    });*/
    $("#admin_header").sticky({
      topSpacing: 0,
      getWidthFrom: "window"
    });
    

  });  

  // DOM isn't ready yet !
  console.log("DOM isn't ready");
  
}));