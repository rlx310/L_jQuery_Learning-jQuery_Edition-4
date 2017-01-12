//

$(document).ready(function() {
    var $body = $('body');
    var $buttons = $('#switcher').find('button');

    $('#switcher-default').addClass('selected').on('click', function() {
        $body.removeClass();
    });
    $('#switcher-narrow').on('click', function() {
        $body.removeClass().addClass('narrow');
    });
    $('#switcher-large').on('click', function() {
        $body.removeClass().addClass('large');
    });

    $buttons.on('click', function() {
        $buttons.removeClass('selected');
        $(this).addClass('selected');
    });
});