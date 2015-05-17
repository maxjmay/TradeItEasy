/**
 * @file
 * Defines '/' route.
 */
/* globals Router, Meteor, Examples */

var maxDate = new Date(2015, 04, 20);

Router.route('/', {
	action: function () {
		this.render('home', {
			data: function () {

				//graphAllTheData(new Date(2014, 04, 01))
				graphAllTheData(new Date(2014, 04, 01))
					//				Meteor.call('getNews', {
					//					term: 'TSCO.L',
					//					from: new Date(2014, 5, 9),
					//					to: new Date(2014, 5, 9)
					//				}, function (error, data) {
					//					console.log(data)
					//				});

				Meteor.call('getTweets', {
					term: 'TSCO.L',
					from: new Date(2014, 00, 01),
					to: new Date(2014, 11, 30)
				}, function (error, data) {
					console.log(data)
				});
				return {};
			}
		});
	}
});

function graphAllTheData(to) {
	Meteor.call('getStocks', {
		company: 'TSCO.L',
		from: new Date(2014, 00, 01),
		to: to
	}, function (error, data) {
		drawGraph(data)
	});
}

function drawGraph(data) {
	data = JSON.parse(data);

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

	x.domain([new Date(2014, 00, 01), maxDate])

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

function formatNumber(number) {
	if (number < 10) {
		number = '0' + number
	}
	return number;
}
