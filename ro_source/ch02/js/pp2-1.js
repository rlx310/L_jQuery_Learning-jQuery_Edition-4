//

$(document).ready(function() {
    var $plays = $('#selected-plays');
    $plays.find('> li').addClass('horizontal');
    $plays.find('li:not(.horizontal)').addClass('sub-level');

    $('a[href^="mailto:"]').addClass('mailto');
    $('a[href$=".pdf"]').addClass('pdflink');
    $('a[href^="http"][href*="henry"]').addClass('henrylink');

    $('a').filter(function () {
        return this.hostname && this.hostname != location.hostname;
    }).addClass('external');

    $('tr:nth-child(odd)').addClass('alt');
    $('td:contains(Henry)')
        .parent()
        .find('td:eq(1)')
        .addClass('highlight')
        .end()
        .find('td:eq(2)')
        .addClass('highlight');

    //pp 2-1
    $plays.find('>li>ul>li').addClass('special');

    // pp2-2
    $('td:nth-child(3)').addClass('year');
    // or
    // $('tr').find('td:eq(2)').addClass('year');

    // pp2-3
    $('tr:contains(Tragedy)').first().addClass('special');
    // or
    // $('tr:contains(Tragedy):eq(0)').addClass('special');

    // pp 2-4
    $('li').find('>a').parent().next().addClass('afterlink');
    // or
    // $('li:has(>a)').next().addClass('afterlink');

    // pp 2-5
    $('a[href$=".pdf"]').closest('ul').addClass('tragedy');
});