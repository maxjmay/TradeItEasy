Meteor.methods({
	getTweets: function (meta) {
		check(meta.term, String);

		var from = meta.from;
		var to = meta.to;

		var fromYear = from.getFullYear;
		var fromMonth = from.getMonth() + 1;
		var fromDay = from.getDate();

		if (fromMonth.length == 1) {
			fromMonth = '0' + fromMonth;
		}

		if (fromDay.length == 1) {
			fromDay = '0' + fromDay;
		}

		var toYear = to.getFullYear;
		var toMonth = to.getMonth() + 1;
		var toDay = to.getDate();

		if (toMonth.length == 1) {
			toMonth = '0' + toMonth;
		}

		if (toDay.length == 1) {
			toDay = '0' + toDay;
		}

		var term = "TSCO.L";

		var requestUrl = 'https://api.twitter.com/1.1/search/tweets.json?q="' + term + '"&since=' + fromYear + '-' + fromMonth + '-' + fromDay + '&until=' + toYear + '-' + toMonth + '-' + toDay;

		console.log(requestUrl);

		Meteor.http.call('GET', requestUrl, {
				headers: {
					Authorization: 'OAuth',
					'Consumer Key': 'qXKhCOVqqQjsOvXKYeFklFO0w',
					'Consumer Secret': 'N7xy6atvUno1l3jBPDdNghpkSuXlk5JSnu1gAL7OrXLbFPEgxA',
					Token: '51223939-mwRyqxBsvBODKNXRiumQmtMzEZjSUWwi5S6EotyZR',
					'Token Secret': 'xhHsN2GxjmZkrqPzO7hTiZM6N1PfqQ1sRt6X1lK3flpGG'
				}
			},
			function (error, result) {
				if (!error) {
					console.log(result);
				}
			});
		var res = Meteor.http.get(requestUrl);
		console.log(res.content);
	}
});
