//

$(document).ready(function() {
    var $body = $('body');
    var $buttons = $('#switcher').find('button');

    $('#switcher-default').addClass('selected');

    $buttons.on('click', function() {
        $body.removeClass();
        $buttons.removeClass('selected');
        $(this).addClass('selected');
    });

    $('#switcher-narrow').on('click', function() {
        $body.addClass('narrow');
    });
    $('#switcher-large').on('click', function() {
        $body.addClass('large');
    });
});