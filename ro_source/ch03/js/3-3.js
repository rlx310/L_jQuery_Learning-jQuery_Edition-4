//

$(document).ready(function() {
    var $body = $('body');
    var $buttons = $('#switcher').find('button');

    $('#switcher-default').addClass('selected').on('click', function() {
        $body.removeClass('narrow');
        $body.removeClass('large');
        $buttons.removeClass('selected');
        $(this).addClass('selected');
    });
    $('#switcher-narrow').on('click', function() {
        $body.addClass('narrow');
        $body.removeClass('large');
        $buttons.removeClass('selected');
        $(this).addClass('selected');
    });
    $('#switcher-large').on('click', function() {
        $body.removeClass('narrow');
        $body.addClass('large');
        $buttons.removeClass('selected');
        $(this).addClass('selected');
    });
});