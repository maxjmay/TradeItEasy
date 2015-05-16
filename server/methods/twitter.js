var cheerio = Meteor.npmRequire('cheerio');

Meteor.methods({
	getTweets: function (meta) {
		check(meta.term, String);

		var from = meta.from;
		var to = meta.to;

		var term = meta.term.replace(' ', '+');

		var requestUrl = 'https://twitter.com/search?q="' + term + '"%20since%3A' + from.getFullYear() + '-' + formatNumber(from.getMonth() + 1) + '-' + formatNumber(from.getDate()) + '%20until%3A' + to.getFullYear() + '-' + formatNumber(to.getMonth() + 1) + '-' + formatNumber(to.getDate()) + '&count=100';

		var res = Meteor.http.get(requestUrl);
		var $ = cheerio.load(res.content);
		var tweets = [];
		var previousLang = '';

		$('.tweet.original-tweet .content .username, .tweet.original-tweet .tweet-timestamp, .tweet.original-tweet .content p.tweet-text').each(function (index, ele) {
			var text = '';

			if (ele.attribs.title != undefined) {
				tweets.push(ele.attribs.title);
			} else {
				text = $(this).text();

				tweets.push(text);

				if (ele.attribs.lang) {
					tweets.push(ele.attribs.lang);
				}
			}
		})

		var finalTweets = [];

		for (var i = 0; i < tweets.length; i += 4) {
			if (tweets[i + 3] == 'en') {
				finalTweets.push({
					'user': tweets[i],
					'date': tweets[i + 1],
					'tweet': tweets[i + 2],
					'lang': tweets[i + 3]
				});
			}
		}
		return finalTweets;
	}
});

function formatNumber(number) {
	if (number < 10) {
		number = '0' + number
	}
	return number;
}
