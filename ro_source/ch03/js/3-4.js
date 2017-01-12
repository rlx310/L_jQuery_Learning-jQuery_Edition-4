//

$(document).ready(function() {
    var $body = $('body');
    var $buttons = $('#switcher').find('button');

    $('#switcher-default').addClass('selected').on('click', function() {
        $body.removeClass('narrow').removeClass('large');
    });
    $('#switcher-narrow').on('click', function() {
        $body.addClass('narrow').removeClass('large');
    });
    $('#switcher-large').on('click', function() {
        $body.removeClass('narrow').addClass('large');
    });

    $buttons.on('click', function() {
        $buttons.removeClass('selected');
        $(this).addClass('selected');
    });
});
