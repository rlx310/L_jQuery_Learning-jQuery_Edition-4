//

$(document).ready(function() {
    var $switcher = $('#switcher');
    var $buttons = $switcher.find('button');

    $switcher.hover(function() {                    // switcher change color: on hover
        $(this).addClass('hover');
    }, function() {
        $(this).removeClass('hover');
    });

    var toggleSwitcher = function(event) {          // switcher expand/collapse: on click
        if (!$(event.target).is('button')) {
            $buttons.toggleClass('hidden');
        }
    };
    $switcher.on('click', toggleSwitcher);

    $switcher.click();                              // simulate click collapse switcher after load

    var setBodyClass = function(className) {        // change page style and update collapse event
        $('body').removeClass().addClass(className);

        $buttons.removeClass('selected');
        $('#switcher-' + className).addClass('selected');

        $switcher.off('click', toggleSwitcher);

        if (className == 'default') {
            $switcher.on('click', toggleSwitcher);
        }
    };

    $('#switcher-default').addClass('selected');    // load with default button selected

    var triggers = {                                // Map key codes with buttons
        D: 'default',
        N: 'narrow',
        L: 'large'
    };

    $switcher.click(function(event) {
        if ($(event.target).is('button')) {
            var bodyClass = event.target.id.split('-')[1];
            setBodyClass(bodyClass);
        }
    });
    $(document).keyup(function(event) {
        var key = String.fromCharCode(event.which);
        if (key in triggers) {
            setBodyClass(triggers[key]);
        }
    });
});
