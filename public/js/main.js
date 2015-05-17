//$(function(){
//	/* vars */
//    var counter = 0;
//    var counter2 = 0;
//    var counterActions = 0;
//
//    $('.bxslider').bxSlider({
//        pager: false,
//        controls: true,
//        infiniteLoop: false
//    });
//
//	$(window).on('scroll', function(){
//		var game = $('#game-intro').offset().top;
//        var parent = $('#identify').offset().top;
//        /*
//        console.log(tubeScrollTop);
//        console.log($(window).scrollTop());
//        */
//		if($(window).scrollTop() >= game){
//            //console.log("LOL");
//			if(!$('.svg-stuff').hasClass('start-animation')){
//				$('.svg-stuff').addClass('start-animation');
//			}
//		}
//
//        /*
//        if($(window).scrollTop() >= parent){
//            //console.log("LOL");
//			if(!$('.svg-stuff-2').hasClass('start-animation')){
//				$('.svg-stuff-2').addClass('start-animation');
//			}
//		}
//        */
//	});
//
//
//    $("#go-button").on("click", function(){
//        console.log(counter2);
//        if(counter2 == 0){
//            var txt = $(".line-sep.money span").text();
//            $("#available").text(txt);
//        }
//        if(counter2 == 2){
//            if($(".question-container").hasClass("hide")){
//                $(".question-container").removeClass("hide");
//            }
//
//
//            $(".line-sep span.go-button").addClass("hide");
//            $(".line-sep.last.hey").addClass("hide");
//
//        }
//
//        if($($(".card-block.hide").get(counter)).hasClass("hide")){
//            $($(".card-block.hide").get(counter)).removeClass("hide");
//        }
//
//        if($($(".line-sep.hide").get(counter)).hasClass("hide") && !$($(".line-sep.hide").get(counter)).hasClass("fixx")){
//            $($(".line-sep.hide").get(counter)).removeClass("hide");
//        }
//
//        if(counter == $(".card-block.hide").length -1){
//            $(".line-sep.last").addClass("hide");
//            $(".shareholder").removeClass("hide");
//        }
//
//        if(!$(".line-sep.fix").hasClass("hide")){
//            $(".line-sep.fix").addClass("hide");
//
//        }
//
//
//        $('html, body').animate({
//            scrollTop: $("#go-button").offset().top
//        }, 1500);
//
//        counter2++;
//        //console.log(counter);
//        //console.log(counter2);
//    });
//
//    var counter = 0;
//    var counter3 = 0;
//    $("#go-button-2").on("click", function(){
//        console.log("counter2", counter2);
//        if(counter2 == 4){
//            $(".line-sep.last-2.hello").addClass("hide");
//            $(".line-sep.decide").removeClass("hide");
//            $(".decision-time").removeClass("hide");
//        }
//
//        if($($(".choice-shareholder").find(".card-block.hide").get(counter)).hasClass("hide")){
//            $($(".choice-shareholder").find(".card-block.hide").get(counter)).removeClass("hide");
//        }
//
//        if($($(".choice-shareholder").find(".line-sep.hide").get(counter)).hasClass("hide")){
//            $($(".choice-shareholder").find(".line-sep.hide").get(counter)).removeClass("hide");
//        }
//        console.log($(".choice-shareholder").find(".card-block").length);
//        console.log(counter3);
//        if(counter3 == $($(".choice-shareholder").find(".card-block")).length - 1){
//            $(".choice-shareholder").find(".line-sep.last-2").addClass("hide");
//            $(".decision-time").removeClass("hide");
//
//        }
//
//        counter3++;
//
//        $('html, body').animate({
//            scrollTop: $("#go-button-2").offset().top
//        }, 1500);
//        counter2++;
//     });
//
//
//    $(".action").on("click", function(){
//
//        console.log("yoho");
//
//        if(counterActions == 0){
//            if($(".shareholder").hasClass("hide")){
//                $(".shareholder").removeClass("hide");
//            }
//
//            $(".card-block.hide.purple.owner").removeClass("hide");
//            //$(".line-sep.last-2").removeClass("hide");
//            $(".line-sep.last-2 .go-button").removeClass("hide");
//
//
//
//        }
//
//        var target = $(this).parent().find(".line-sep");
//        if(target.hasClass("hide")){
//            target.removeClass("hide");
//        }
//
//        if($(this).hasClass("yes")){
//            $(this).parent().parent().next().addClass("yes");
//        }
//        else{
//            $(this).parent().parent().next().addClass("no");
//            if($(".choice-shareholder").hasClass("hide")){
//                $(".choice-shareholder").removeClass("hide");
//                $(".line-sep.last-2").removeClass("hide");
//
//                if(!$(".line-sep.decide").hasClass("hide")){
//                    $(".line-sep.decide").addClass("hide");
//
//                }
//
//                if(!$(".card-block.decide").hasClass("hide")){
//                    $(".card-block.decide").addClass("hide");
//
//                }
//            }
//        }
//
//
//        if($(this).hasClass("food")){
//            $(".choice-company").removeClass("hide");
//            if($(".card-block-2").hasClass("hide-2")){
//                $(".card-block-2").removeClass("hide-2");
//            }
//
//            $(".decision-company").removeClass("hide");
//
//        }
//
//        if($(this).hasClass("tesco")){
//            $(".understand-company").removeClass("hide");
//        }
//
//
//        $('html, body').animate({
//            scrollTop: $(this).next().offset().top
//        }, 1500);
//
//        counterActions++;
//    });
//
//});
