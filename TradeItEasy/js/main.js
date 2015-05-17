$(function(){ 
	/* vars */
    var counter = 0;
    var counter2 = 0;
	$(window).on('scroll', function(){
		var game = $('#game-intro').offset().top;
        var parent = $('#identify').offset().top;
        /*
        console.log(tubeScrollTop);
        console.log($(window).scrollTop());
        */
		if($(window).scrollTop() >= game){
            //console.log("LOL");
			if(!$('.svg-stuff').hasClass('start-animation')){
				$('.svg-stuff').addClass('start-animation');
			}
		}
        
        /*
        if($(window).scrollTop() >= parent){
            //console.log("LOL");
			if(!$('.svg-stuff-2').hasClass('start-animation')){
				$('.svg-stuff-2').addClass('start-animation');
			}
		}
        */
	});
    
    $(".go-button").on("click", function(){
        
        if($($(".card-block.hide").get(counter)).hasClass("hide")){
            $($(".card-block.hide").get(counter)).removeClass("hide");
        }
        
        if($($(".line-sep.hide").get(counter)).hasClass("hide")){
            $($(".line-sep.hide").get(counter)).removeClass("hide");
        }
        
        if(counter == $(".card-block.hide").length){
            $(".line-sep.last").addClass("hide");
            $(".shareholder").removeClass("hide");
        }
        
        if(!$(".line-sep.fix").hasClass("hide")){
            $(".line-sep.fix").addClass("hide");
            
        }
        
        //console.log(counter);
        //console.log(counter2);
        
        
        
    });
    
    $(".action").on("click", function(){
        console.log("yoho");
        var target = $(this).parent().find(".line-sep");
        if(target.hasClass("hide")){
            target.removeClass("hide");
        }

        if($(this).hasClass("yes")){
            $(".svg-stuff-3").addClass("yes");
        }
        else{
            $(".svg-stuff-3").addClass("no");
            if($(".choice-shareholder").hasClass("hide")){
                $(".choice-shareholder").removeClass("hide");
                $(".line-sep.last-2").removeClass("hide");

            }
        }
        
    });

})
