$(function(){ 
	/* vars */
	$(window).on('scroll', function(){
		var tubeScrollTop = $('#game-intro').offset().top;
        /*
        console.log(tubeScrollTop);
        console.log($(window).scrollTop());
        */
		if($(window).scrollTop() >= tubeScrollTop){
            console.log("LOL");
			if(!$('.svg-stuff').hasClass('start-animation')){
				$('.svg-stuff').addClass('start-animation');
			}
		}
	});

})
