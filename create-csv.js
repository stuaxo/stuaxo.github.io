function readDate(dmy, seperator = '/') {  // example HSBC date: 15 Jan 08
    const months = "JanFebMarAprMayJunJulAugSepOctNovDec".match(/.{1,3}/g)  // Split every 3rd character
    const [day, month, year] = dmy.split(' ')
    return [2000 + Number(year), 1 + months.indexOf(month), day].join(seperator)
}

function readStatementLine(element) {
    const [date, description, amount] = Array.from(element.cells).map(function (e) { return e.textContent })
    return {
        date: readDate(date.replace(/^Date/, '')),
        description: description.replace(/^Description/, '').replace(/[,'"]/g, ''),
        amount: amount.replace(/^Amount/, '').replace(',', '')
    }
}

function generateCSV() {
    const statementDateElement = document.querySelector("span[data-dojo-attach-point='statementDate']").textContent
    const fileName = `HSBC current - month ending ${readDate(statementDateElement, '.')}`

    var tableElement = document.querySelectorAll('table:not(.extPibTable) tbody tr:not(.dijitReset)')

    const csv = Array.from(tableElement)
        .map(readStatementLine)
        .filter(statementLine => statementLine.amount)
        .filter(statementLine => "Closing balance this month" != statementLine.description)
        .map(statementLine => `${statementLine.date},${statementLine.amount},${statementLine.description}`)
        .join('\n')
    const data = `data:application/csv;charset=utf-8,${encodeURIComponent(csv)}`

    document.body.insertAdjacentHTML('afterend', `<a href="${data}" download="${fileName}.csv" id="download-statement" style="display: none;">Download</a>`)
    const download_link = document.getElementById('download-statement')
    download_link.click();
    download_link.remove();
}

generateCSV()
