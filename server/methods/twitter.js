var twitter = new TwitterApi();

Meteor.methods({
	getTweets: function (meta) {
		check(meta.term, String);

		var from = meta.from;
		var to = meta.to;

		var fromYear = from.getFullYear();
		var fromMonth = from.getMonth() + 1;
		var fromDay = from.getDate();

		if (fromMonth < 10) {
			fromMonth = '0' + fromMonth;
		}

		if (fromDay < 10) {
			fromDay = '0' + fromDay;
		}

		var toYear = to.getFullYear();
		var toMonth = to.getMonth() + 1;
		var toDay = to.getDate();

		if (toMonth< 10) {
			toMonth = '0' + toMonth;
		}

		if (toDay < 10) {
			toDay = '0' + toDay;
		}

//		var searchTerm = '"' + meta.term + '"&since=' + fromYear + '-' + fromMonth + '-' + fromDay + '&until=' + toYear + '-' + toMonth + '-' + toDay;
		var searchTerm = 'TSCO.L';

		var twitterResults = twitter.callAsApp('GET', 'search/tweets.json', {
			q: 'TSCO.L',
			since: '2008-05-13',
			until: '2013-05-13'
		});

		//		for (var i = 0; statuses.length; i++) {
		//var followerScore =
		//var favouriteScore =
		//var retweetScore =
		//		}


		return twitterResults;
	}
});
