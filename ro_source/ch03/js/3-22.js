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
    var toggleSwitcher = function(event) {
        if (!$(event.target).is('button')) {
            $buttons.toggleClass('hidden');
        }
    };
    $switcher.on('click', toggleSwitcher);

    $buttons.click(function() {
        $switcher.off('click', toggleSwitcher);

        if (this.id == 'switcher-default') {
            $switcher.on('click', toggleSwitcher);
        }
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
        }
    })
});