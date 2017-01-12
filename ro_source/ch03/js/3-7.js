//

$(document).ready(function() {
    var $buttons = $('#switcher').find('button');

    $('#switcher-default').addClass('selected');

    $buttons.on('click', function() {
        var bodyClass = this.id.split('-')[1];
        $('body').removeClass().addClass(bodyClass);

        $buttons.removeClass('selected');
        $(this).addClass('selected');
    });
});