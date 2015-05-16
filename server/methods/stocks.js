Meteor.methods({
	getStocks: function (meta) {
		check(meta.company, String);

		var from = meta.from;
		var to = meta.to;

		var requestUrl = 'http://real-chart.finance.yahoo.com/table.csv?s=' + meta.company + '&a=' + to.getMonth() + '&b=' + to.getDate() + '&c=' + to.getFullYear() + '&d=' + from.getMonth() + '&e=' + from.getDate() + '&f=' + from.getFullYear() + '&g=d&ignore=.csv';

		console.log(requestUrl);
		var res = Meteor.http.get(requestUrl);
		var json = convertCSV(res.content);
		return json;
	}
});

function convertCSV(csvString) {
	var json = [];
	var csvArray = csvString.split("\n");
	var csvColumns = csvArray[0].split(',');

	for (var i = 1; i < csvArray.length - 1; i++) {
		var csvRowString = csvArray[i];
		var csvRow = csvRowString.split(",");
		jsonRow = new Object();
		for (var colNum = 0; colNum < csvRow.length; colNum++) {
			var colData = csvRow[colNum].replace(/^['"]|['"]$/g, "");
			jsonRow[csvColumns[colNum]] = colData;
		}
		json.push(jsonRow);
	}

	return JSON.stringify(json);
}

function formatNumber(number) {
	if (number < 10) {
		number = '0' + number
	}
	return number;
}
