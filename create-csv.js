var csv = '';
var nl = '\n';
var $table = $('table:not(".extPibTable")');
var statement_date = $("span[data-dojo-attach-point='statementDate']").html();
var year = statement_date.split(" ")[2];
var months = "JanFebMarAprMayJunJulAugSepOctNovDec";
var month = months.indexOf(statement_date.split(" ")[1]) / 3 + 1;
var day = statement_date.split(" ")[0];
var file_name = 'HSBC current - month ending ' + year + '.' + month + '.' + day;

var tmp = '';

// get rest of data
var done = false;
// loop rows
$('tbody tr:not(".dijitReset")', $table).slice(1, $table.length).each(function(){
    tmp = this;
    if (done) { return; }
    var date = $($('td', tmp)[0]).text().split("Date")[1];
    var segs = date.split(' ');
    var day = segs[0];
    var month = months.indexOf(segs[1]) / 3 + 1;
    var year = segs[2];
    var amo = $($('td', tmp)[2]).text().split("Amount")[1];
    console.log(tmp)
    if (amo) {
	csv = csv + day + '/' + month + '/' + year + ',';

	csv = csv + amo.replace(/,/g, '') + ',';

	var desc = $($('td', tmp)[1]).text().split("Description")[1];
	csv = csv + desc.replace(/[,'"]/g, '') + ',';
	csv = csv + nl;
    }
    if (desc == "Closing balance this month") {
	done = true;
    }
});

var data = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);
$('body').append('<a href="'+data+'" download="'+file_name+'.csv" id="download-statement" style="display: none;">Download</a>');
$('#download-statement')[0].click();
