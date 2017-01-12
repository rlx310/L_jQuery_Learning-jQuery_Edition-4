//

$(document).ready(function() {
    window.$switcher = $('#switcher');
    window.$buttons = $switcher.find('button');

    $switcher.find('h3').hover(function() {
        $(this).addClass('hover');
    }, function() {
        $(this).removeClass('hover');
    });
});
$(document).ready(function() {
    $switcher.click(function() {
        $buttons.toggleClass('hidden');
    });
});
$(document).ready(function() {
    $('#switcher-default').addClass('selected');

    $switcher.click(function(event) {
        if ($(event.target).is('button')) {
            var bodyClass = event.target.id.split('-')[1];
            $('body').removeClass().addClass(bodyClass);

            $buttons.removeClass('selected');
            $(event.target).addClass('selected');
            event.stopPropagation();
        }
    });
});
