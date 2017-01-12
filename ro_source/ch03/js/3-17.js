//

$(document).ready(function() {
    window.$switcher = $('#switcher');
    window.$buttons = $switcher.find('button');

    $switcher.hover(function() {
        $(this).addClass('hover');
    }, function() {
        $(this).removeClass('hover');
    });
});
$(document).ready(function() {
    $('#switcher-default').addClass('selected');

    $switcher.on('click', function(event) {
        if (!$(event.target).is('button')) {
            $buttons.toggleClass('hidden');
        }
    }).on('click', 'button', function() {
        var bodyClass = this.id.split('-')[1];
        $('body').removeClass().addClass(bodyClass);

        $buttons.removeClass('selected');
        $(this).addClass('selected');
    });
});