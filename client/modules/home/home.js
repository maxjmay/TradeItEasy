/**
 * @file
 * Defines '/' route.
 */
/* globals Router, Meteor, Examples */

Router.route('/', {
	action: function () {
		this.render('home', {
			data: function () {
				Meteor.call('getStocks', {
					company: 'TSCO.L',
					from: new Date(2015, 00, 01),
					to: new Date()
				}, function (error, data) {
				});

				Meteor.call('getNews', {
					term: 'TSCO.L',
					from: new Date(2014, 5, 9),
					to: new Date(2014, 5, 9)
				}, function (error, data) {
				});

				Meteor.call('getTweets', {
					term: 'TSCO.L',
					from: new Date(2014, 00, 01),
					to: new Date(2014, 11, 30)
				}, function (error, data) {
				});
				return {};
			}
		});
	}
});

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
