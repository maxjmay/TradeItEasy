var cheerio = Meteor.npmRequire('cheerio');

Meteor.methods({
	getNews: function (meta) {
		check(meta.term, String);

		var from = meta.from;
		var to = meta.to;

		var term = meta.term.replace(' ', '+');

		var requestUrl = 'https://www.google.co.uk/search?q=' + term + '&biw=1252&bih=968&source=lnt&tbs=cdr%3A1%2Ccd_min%3A' + formatNumber(to.getDate()) + '%2F' + formatNumber(from.getMonth()) + '%2F' + from.getFullYear() + '%2Ccd_max%3A' + formatNumber(from.getDate()) + '%2F' + formatNumber(from.getMonth()) + '%2F' + from.getFullYear() + '&tbm=nws';

		console.log(requestUrl);
		var res = Meteor.http.get(requestUrl);
		var $ = cheerio.load(res.content);
		var news = [];
		$('h3.r a').each(function (index, ele) {
			var link = ele.attribs.href.replace('/url?q=', '').split('/&sa=')[0];
			news.push(link);
		})
		return news;
	}
});

function formatNumber(number) {
	if (number < 10) {
		number = '0' + number
	}
	return number;
}
