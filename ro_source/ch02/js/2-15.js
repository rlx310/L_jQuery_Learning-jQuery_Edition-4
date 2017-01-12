//

$(document).ready(function() {
    var $plays = $('#selected-plays');
    $plays.find('> li').addClass('horizontal');
    $plays.find('li:not(.horizontal)').addClass('sub-level');

    $('a[href^="mailto:"]').addClass('mailto');
    $('a[href$=".pdf"]').addClass('pdflink');
    $('a[href^="http"][href*="henry"]').addClass('henrylink');

    $('a').filter(function() {
        return this.hostname && this.hostname != location.hostname;
    }).addClass('external');

    $('tr:nth-child(odd)').addClass('alt');
    $('td:contains(Henry)')         // for every cell containing "Henry"
        .parent()                   // select parent
        .find('td:eq(1)')           // find the 2nd child
        .addClass('highlight')      // add "highlight" class
        .end()                      // return to parent
        .find('td:eq(2)')           // find the 3rd child
        .addClass('highlight');     // add "highlight" class
});