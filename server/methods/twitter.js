var twitter = new TwitterApi();

Meteor.methods({
	getTweets: function (meta) {
		check(meta.term, String);

		var from = meta.from;
		var to = meta.to;

		var fromYear = from.getFullYear();
		var fromMonth = from.getMonth() + 1;
		var fromDay = from.getDate();

		if (fromMonth.length == 1) {
			fromMonth = '0' + fromMonth;
		}

		if (fromDay.length == 1) {
			fromDay = '0' + fromDay;
		}

		var toYear = to.getFullYear();
		var toMonth = to.getMonth() + 1;
		var toDay = to.getDate();

		if (toMonth.length == 1) {
			toMonth = '0' + toMonth;
		}

		if (toDay.length == 1) {
			toDay = '0' + toDay;
		}

		return twitter.search('"' + meta.term + '"&since=' + fromYear + '-' + fromMonth + '-' + fromDay + '&until=' + toYear + '-' + toMonth + '-' + toDay);
	}
});
