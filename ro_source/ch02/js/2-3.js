//

$(document).ready(function() {
    var $plays = $('#selected-plays');
    $plays.find('> li').addClass('horizontal');
    $plays.find('li:not(.horizontal)').addClass('sub-level');

    $('a[href^="mailto:"]').addClass('mailto');
});