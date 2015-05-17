/**
 * @file
 * Defines '/' route.
 */
/* globals Router, Meteor, Examples */

var maxDate = new Date(2015, 04, 17);
var from = new Date(2014, 0, 1);

var labels = [{
	date: new Date(2014, 5, 27),
	message: 'Annual General Meeting'
}, {
	date: new Date(2014, 7, 29),
	message: 'Shock low profit warning'
}, {
	date: new Date(2014, 9, 23),
	message: 'Accounting announced error'
}, {
	date: new Date(2015, 0, 8),
	message: 'Unprofitable stores closed'
}];


var XP = 0;
var level;

Router.route('/', {
	action: function () {
		this.render('home', {
			data: function () {
				Meteor.call('getStocks', {
					company: 'TSCO.L',
					from: new Date(2015, 00, 01),
					to: new Date()
				}, function (error, data) {});

				//				Meteor.call('getNews', {
				//					term: 'TSCO.L',
				//					from: new Date(2014, 5, 9),
				//					to: new Date(2014, 5, 9)
				//				}, function (error, data) {});

				Meteor.call('getTweets', {
					term: 'TSCO.L',
					from: new Date(2014, 00, 01),
					to: new Date(2014, 11, 30)
				}, function (error, data) {});
				graphAllTheData(new Date(2014, 0, 1))
					//graphAllTheData(maxDate);

				return {};
			}
		});
	}
});

Template.home.rendered = function () {
	init();
}

function graphAllTheData(to) {
	Meteor.call('getStocks', {
		company: 'TSCO.L',
		from: from,
		to: to
	}, function (error, data) {
		drawGraph(data)
		drawLabels(to, data);
	});
}

function drawGraph(data) {
	data = JSON.parse(data);

	$('body>svg').remove();
	var newData = []

	data.forEach(function (d) {
		try {
			if (new Date(d.Date).getDate() != -1) {
				newData.push(d);
			}
		} catch (e) {}
	});

	data = newData;

	console.log(data);

	var width = window.innerWidth - 40,
		height = 300 - 10;

	var parseDate = d3.time.format("%d-%b-%y").parse;

	var x = d3.time.scale()
		.range([0, width]);

	var y = d3.scale.linear()
		.range([height - 20, 0]);

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left");

	var line = d3.svg.line()
		.x(function (d) {
			console.log(d)
			console.log(new Date(d['Date']))
			return x(d3.time.format("%Y-%m-%d").parse(d['Date']));
		})
		.y(function (d) {
			console.log(d['Close'])
			return y(d['Close']);
		});

	var area = d3.svg.area()
		.x(function (d) {
			return x(d3.time.format("%Y-%m-%d").parse(d['Date']));
		})
		.y0(height)
		.y1(function (d) {
			return y(d['Close']);
		});

	var svg = d3.select("body").append("svg")
		.attr("width", width + 40)
		.attr("height", height + 20)
		.append("g")
		.attr("transform", "translate(50,20)");

	x.domain(d3.extent(data, function (d) {
		return d3.time.format("%Y-%m-%d").parse(maxDate.getFullYear() + '-' + formatNumber(maxDate.getMonth()) + '-' + formatNumber(maxDate.getDate()));
	}));

	x.domain([from, maxDate])

	y.domain(d3.extent(data, function (d) {
		return d['Close'];
	}));

	svg.append("path")
		.datum(data)
		.attr("class", "area")
		.attr("d", area);

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(10," + height + ")")
		.call(xAxis);

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
}

function drawLabels(to, data) {
	labels.forEach(function (label, index) {
		console.log(label.date);
		if (label.date < to) {
			var diff = (from.getTime() - maxDate.getTime()) - (from.getTime() - label.date.getTime());
			var total = from.getTime() - maxDate.getTime();

			var _width = window.innerWidth - 20;

			var percent = total / diff;

			$('body').append('<div style="bottom: ' + 250 + 'px; left:' + (_width - (_width / percent) + 40) + 'px" class="glabel">' + label.message + '</div>')
		}
	});
}

function formatNumber(number) {
	if (number < 10) {
		number = '0' + number
	}
	return number;
}

function getTweetsFrom(term, from, to) {
	Meteor.call('getTweets', {
		term: 'TSCO.L',
		from: from,
		to: to
	}, function (error, data) {
		console.log(data)
	});
	return {};
}


// calculation code

var previousPositions = [];
var shares = [];

function getAllShares() {
	Meteor.call('getStocks', {
		company: 'TSCO.L',
		from: new Date(2014, 05, 01),
		to: new Date()
	}, function (error, data) {
		shares = JSON.parse(data);

		//		getProfitLoss('2014-06-27', 'short', 10000, '2014-08-29');
		//		getProfitLoss('2014-08-29', 'short', 10000, '2014-10-23');
		//		getProfitLoss('2014-10-23', 'long', 10000, '2014-12-09');
		//		getProfitLoss('2014-12-09', 'long', 10000, '2015-01-08');
		//		getProfitLoss('2015-01-08', 'long', 10000, '2015-02-24');
		//		getProfitLoss('2015-02-24', 'short', 10000, '2015-04-13');
		//		getProfitLoss('2015-04-13', 'short', 10000, '2015-04-22');
		//		getProfitLoss('2015-04-22', 'long', 10000, '2015-05-11');
	});
}

getAllShares();

function getProfitLoss(previousDate, previousPosition, previousAmount, currentDate) {

	var previousPrice = getSharePrice(previousDate);

	previousPositions.push({
		position: previousPosition,
		amount: previousAmount,
		date: previousDate,
		share: previousPrice
	});

	var total = 100000;
	var currentPrice = getSharePrice(currentDate);

	for (var i = 0; i < previousPositions.length; i++) {
		if (previousPositions[i].position == 'long') {
			if (currentPrice < previousPositions[i].share) {
				total += ((previousPositions[i].share - currentPrice) * 100);
			} else {
				total += ((currentPrice - previousPositions[i].share) * 100);
			}
		} else if (previousPositions[i].position == 'short') {
			if (currentPrice < previousPositions[i].share) {
				total += ((previousPositions[i].share - currentPrice) * 100);
			} else {
				total += ((previousPositions[i].share - currentPrice) * 100);
			}
		}
	}

	total = total - (previousPrice * 100);

	return total;
}

function getSharePrice(date) {
	if (shares) {
		for (var i = 0; i < shares.length; i++) {
			if (shares[i].Date == date) {
				return shares[i].Close;
			}
		}
	}
	return false;
}

function init() {

	/* vars */
	var counter = 0;
	var counter2 = 0;
	var counterActions = 0;

	$(window).on('scroll', function () {
		var game = $('#game-intro').offset().top;
		var parent = $('#identify').offset().top;
		/*
		console.log(tubeScrollTop);
		console.log($(window).scrollTop());
		*/
		if ($(window).scrollTop() >= game) {
			//console.log("LOL");
			if (!$('.svg-stuff').hasClass('start-animation')) {
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
	console.log($("#go-button"))
	var ehh = 0;
	$("#go-button").on("click", function () {
		if (ehh == 0) {

			graphAllTheData(new Date(2014, 0, 12));
		} else if (ehh == 1) {
			graphAllTheData(new Date(2014, 0, 28))
		}
		ehh++;

		console.log(counter2);
		if (counter2 == 0) {
			var txt = $(".line-sep.money span").text();
			$("#available").text(txt);
		}
		if (counter2 == 2) {
			if ($(".question-container").hasClass("hide")) {
				$(".question-container").removeClass("hide");
			}


			$(".line-sep span.go-button").addClass("hide");
			$(".line-sep.last.hey").addClass("hide");

		}

		if ($($(".card-block.hide").get(counter)).hasClass("hide")) {
			$($(".card-block.hide").get(counter)).removeClass("hide");
		}

		if ($($(".line-sep.hide").get(counter)).hasClass("hide") && !$($(".line-sep.hide").get(counter)).hasClass("fixx")) {
			$($(".line-sep.hide").get(counter)).removeClass("hide");
		}

		if (counter == $(".card-block.hide").length - 1) {
			$(".line-sep.last").addClass("hide");
			$(".shareholder").removeClass("hide");
		}

		if (!$(".line-sep.fix").hasClass("hide")) {
			$(".line-sep.fix").addClass("hide");

		}


		$('html, body').animate({
			scrollTop: $("#go-button").offset().top
		}, 1500);

		counter2++;
		//console.log(counter);
		//console.log(counter2);
	});

	var counter = 0;
	var counter3 = 0;
	var ehh2 = 0;
	$("#go-button-2").on("click", function () {

		if (ehh2 == 0) {
			graphAllTheData(new Date(2014, 4, 22))
		} else if (ehh2 == 1) {
			graphAllTheData(new Date(2014, 4, 25))
		} else if (ehh2 == 2) {
			graphAllTheData(new Date(2014, 4, 31))
		}

		ehh2++;


		console.log("counter2", counter2);
		if (counter2 == 4) {
			$(".line-sep.last-2.hello").addClass("hide");
			$(".line-sep.decide").removeClass("hide");
			$(".decision-time").removeClass("hide");
		}

		if ($($(".choice-shareholder").find(".card-block.hide").get(counter)).hasClass("hide")) {
			$($(".choice-shareholder").find(".card-block.hide").get(counter)).removeClass("hide");
		}

		if ($($(".choice-shareholder").find(".line-sep.hide").get(counter)).hasClass("hide")) {
			$($(".choice-shareholder").find(".line-sep.hide").get(counter)).removeClass("hide");
		}
		console.log($(".choice-shareholder").find(".card-block").length);
		console.log(counter3);
		if (counter3 == $($(".choice-shareholder").find(".card-block")).length - 1) {
			$(".choice-shareholder").find(".line-sep.last-2").addClass("hide");
			$(".decision-time").removeClass("hide");

		}

		counter3++;

		$('html, body').animate({
			scrollTop: $("#go-button-2").offset().top
		}, 1500);
		counter2++;
	});

	var ehh3 = 0;
	$(".action").on("click", function () {

		console.log("yoho");

		if (ehh3 == 0) {
			graphAllTheData(new Date(2014, 4, 10))
		} else if (ehh3 == 1) {
			graphAllTheData(new Date(2014, 4, 31))
		} else if (ehh3 == 2) {
			graphAllTheData(maxDate)
		}

		ehh3++;
		if (counterActions == 0) {
			if ($(".shareholder").hasClass("hide")) {
				$(".shareholder").removeClass("hide");
			}

			$(".card-block.hide.purple.owner").removeClass("hide");
			//$(".line-sep.last-2").removeClass("hide");
			$(".line-sep.last-2 .go-button").removeClass("hide");



		}

		var target = $(this).parent().find(".line-sep");
		if (target.hasClass("hide")) {
			target.removeClass("hide");
		}

		if ($(this).hasClass("yes")) {
			$(this).parent().parent().next().addClass("yes");
		} else {
			$(this).parent().parent().next().addClass("no");
			if ($(".choice-shareholder").hasClass("hide")) {
				$(".choice-shareholder").removeClass("hide");
				$(".line-sep.last-2").removeClass("hide");

				if (!$(".line-sep.decide").hasClass("hide")) {
					$(".line-sep.decide").addClass("hide");

				}

				if (!$(".card-block.decide").hasClass("hide")) {
					$(".card-block.decide").addClass("hide");

				}
			}
		}


		if ($(this).hasClass("food")) {
			$(".choice-company").removeClass("hide");
			if ($(".card-block-2").hasClass("hide-2")) {
				$(".card-block-2").removeClass("hide-2");
			}

			$(".decision-company").removeClass("hide");

		}

		if ($(this).hasClass("tesco")) {
			$(".understand-company").removeClass("hide");
			$('.bxslider').bxSlider({
				pager: false,
				controls: true,
				infiniteLoop: false
			});
		}


		$('html, body').animate({
			scrollTop: $(this).next().offset().top
		}, 1500);

		counterActions++;
	});
}

function showHideModal() {
	$("#modalOverlay").toggleClass("displayNone");
}


function increaseLvl() {
	$("#levelNumber").text(Number($("#levelNumber").text()) + 1);
}

function increaseXP(amount) {

	XP = amount + XP;
	if (XP >= 100) {
		XP = 0;
		increaseLvl();
	}

	$('body').append('<style>#XPbar:before{width:' + XP + '% !important;}</style>');
}
