//

$(document).ready(function() {
    var $body = $('body');

    $('#switcher-default').on('click', function() {
        $body.removeClass('narrow');
        $body.removeClass('large');
    });
    $('#switcher-narrow').on('click', function() {
        $body.removeClass('large');
        $body.addClass('narrow');
    });
    $('#switcher-large').on('click', function() {
        $body.removeClass('narrow');
        $body.addClass('large');
    });
});
