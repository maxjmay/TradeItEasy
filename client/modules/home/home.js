/**
 * @file
 * Defines '/' route.
 */
/* globals Router, Meteor, Examples */

var maxDate = new Date(2015, 04, 17);
var from = new Date(2014, 4, 1);

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
}]

Router.route('/', {
	action: function () {
		this.render('home', {
			data: function () {
				//graphAllTheData(new Date(2014, 5, 28))
				graphAllTheData(maxDate)
				return {};
			}
		});
	}
});

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
		term: term,
		from: from,
		to: to
	}, function (error, data) {
		console.log(data)
	});
	return {};
}
