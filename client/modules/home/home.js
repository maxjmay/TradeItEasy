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
					console.log(data)
				});

				Meteor.call('getNews', {
					term: 'TSCO.L',
					from: new Date(2014, 5, 9),
					to: new Date(2014, 5, 9)
				}, function (error, data) {
					console.log(data)
				});

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
