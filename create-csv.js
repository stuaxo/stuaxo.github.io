var csv = '';
var nl = '\n';
var $table = $('table:not(".extPibTable")');
var statement_date = $("span[data-dojo-attach-point='statementDate']").html();
var year = statement_date.split(" ")[2];
var month = "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(statement_date.split(" ")[1]) / 3 + 1;
var day = statement_date.split(" ")[0];
var file_name = 'HSBC current - month ending ' + year + '.' + month + '.' + day;

var csv = '';

// build header
var tmp = $('th', $table);
csv = csv + '"' + $(tmp[0]).text() + '",';
csv = csv + '"' + $(tmp[1]).text() + '",';
csv = csv + '"' + $(tmp[2]).text() + '",';
csv = csv + '"' + $(tmp[3]).text() + '"';
csv = csv + nl;

// get rest of data
var done = false;
// loop rows
$('tbody tr', $table).slice(1, $table.length).each(function(){
	tmp = this;
	if (done) { return; }
	csv = csv + '"' + $($('td', tmp)[0]).text().split("Date")[1] + '",';

	var desc = $($('td', tmp)[1]).text().split("Description")[1];
	csv = csv + '"' + desc + '",';

	var amo = $($('td', tmp)[2]).text().split("Amount")[1];
	if (typeof amo == 'undefined') { amo = ""; }
	csv = csv + '"' + amo + '",';

	var bal = $($('td', tmp)[3]).text().split("Balance")[1].trim();
	if (bal == "not applicable") { bal = ""; }
	csv = csv + '"' + bal + '"';

	if (desc == "Closing balance this month") {
		done = true;
	}
	csv = csv + nl;
	
});
var data = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);
$('body').append('<a href="'+data+'" download="'+file_name+'.csv" id="download-statement" style="display: none;">Download</a>');
$('#download-statement')[0].click();
