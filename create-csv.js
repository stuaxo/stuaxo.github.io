var months = "JanFebMarAprMayJunJulAugSepOctNovDec";
function reformatHSBCDate(dmy, seperator) {  // example HSBC date: 15 Jan 08
    var [day, month, year] = dmy.split(' '); 
    return [2000 + Number(year), months.indexOf(month) / 3 + 1, day].join(seperator || '.');
}

var statement_date = document.querySelector("span[data-dojo-attach-point='statementDate']").textContent;
var file_name = `HSBC current - month ending ${reformatHSBCDate(statement_date, '.')}`;

var csv = '';
var table = document.querySelectorAll('table:not(.extPibTable) tbody tr:not(.dijitReset)');
Array.from(table).some(function(element){
    var cells = element.cells;
    var date = cells[0].textContent.replace(/^Date/, '');
    var description = cells[1].textContent.replace(/^Description/, '');
    var amount = cells[2].textContent.replace(/^Amount/, '');

    if (description == "Closing balance this month") { 
        return true 
    };
    if (amount) {
        var line = 
            `${reformatHSBCDate(date, '/')},` +
            `${amount.replace(/,/g, '')},` +
            `${description.replace(/[,'"]/g, '')}`;
        csv += `${line}\n`;
    }
});

var data = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);
document.body.insertAdjacentHTML('afterend', `<a href="${data}" download="${file_name}.csv" id="download-statement" style="display: none;">Download</a>`);
var download_link = document.getElementById('download-statement')
download_link.click();
download_link.remove();
