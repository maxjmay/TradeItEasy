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
					from: new Date(),
					to: new Date(2015, 00, 01)
				}, function (error, data) {
					console.log(data)
				});

				Meteor.call('getNews', {
					term: 'TSCO.L',
					from: new Date(),
					to: new Date(2015, 00, 01)
				}, function (error, data) {
					console.log(data)
				});
				return {};
			}
		});
	}
});
