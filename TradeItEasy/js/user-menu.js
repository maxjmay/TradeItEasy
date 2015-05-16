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

    // Only call functions we need when DOM is ready
    showUserMenu();
    
  });  

  // DOM isn't ready yet !
  console.log("DOM isn't ready");

  // Caching variables
  function showUserMenu(){
    var menu = $(".user-menu ul");
    var target = $(".expand-menu");
    var arrow = $(".login-menu");
    var menu_height = $(target).height();

    $(menu).hide();

    $(target).click(function(){
      if($(menu).is(":hidden")){
        $(menu).slideDown("500");
        $(arrow).removeClass("bottom-arrow");
        $(arrow).toggleClass("top-arrow");
      }
      else{
        $(menu).slideUp();
        $(arrow).removeClass("top-arrow");
        $(arrow).toggleClass("bottom-arrow");
      }
    });
    
  }


}));