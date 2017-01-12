//

$(document).ready(function() {
    var $switcher = $('#switcher');
    var $buttons = $switcher.find('button');

    $switcher.hover(function() {
        $(this).addClass('hover');
    }, function() {
        $(this).removeClass('hover');
    });

    var toggleSwitcher = function(event) {
        if (!$(event.target).is('button')) {
            $buttons.toggleClass('hidden');
        }
    };
    $switcher.on('click', toggleSwitcher);

    $switcher.click();

    var setBodyClass = function(className) {
        $('body').removeClass().addClass(className);

        $buttons.removeClass('selected');
        $('#switcher-' + className).addClass('selected');

        $switcher.off('click', toggleSwitcher);

        if (className == 'default') {
            $switcher.on('click', toggleSwitcher);
        }
    };

    $('#switcher-default').addClass('selected');

    var triggers = {
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
        var $selected = $('.selected');             // pp3
        if (key in triggers) {
            setBodyClass(triggers[key]);
        }

        // pp3-3
        else if (event.which == 39) {
            $buttons.removeClass('hidden');

            if ($selected.next().attr('id')) {
                setBodyClass($selected.next().attr('id').split('-')[1]);
            }
            else {
                setBodyClass('default');
            }
        }
        else if (event.which == 37) {
            $buttons.removeClass('hidden');

            if ($selected.prev().attr('id')) {
                setBodyClass($selected.prev().attr('id').split('-')[1]);
            }
            else {
                setBodyClass('large');
            }
        }
    });

    // pp3-1
    $('.author').click(function() {
        $(this).addClass('selected');
        // or
        // $(this).toggleClass('selected');
    });

    // pp3-2
    $('.chapter-title').dblclick(function() {
        $(this).parent().find('p').toggleClass('hidden');
        // or
        // $(this).nextAll().toggleClass('hidden');
    });

    // pp3-4
    $('.chapter').mousemove(function(event) {
        if ($(event.target).is('p')) {
            console.log("Mouse on paragraph at coord: (" + event.pageX + ", " + event.pageY + ")");
        }
    });

    // pp3-5
    var yDown = 0;

    $(document).mousedown(function(event) {
        yDown = event.clientY;
    });
    $(document).mouseup(function(event) {
       if (yDown > event.clientY) {
           $('.chapter').find('p').addClass('hidden');
       }
       else if (yDown < event.clientY) {
           $('.chapter').find('p').removeClass('hidden');
       }
    });
});
