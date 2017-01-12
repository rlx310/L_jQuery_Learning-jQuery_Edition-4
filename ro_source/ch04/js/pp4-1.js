//

$(document).ready(function() {
    var $speech = $('div.speech');
    var defaultSize = $speech.css('fontSize');

    $('#switcher').find('button').click(function() {
        var num = parseFloat($speech.css('fontSize'));

        switch (this.id) {
            case 'switcher-large':
                num *= 1.4;
                break;
            case 'switcher-small':
                num /= 1.4;
                break;
            default:
                num = parseFloat(defaultSize);
        }
        $speech.animate({fontSize: num + 'px'}, 'slow');
    });

    var $para = $('p');
    $para.eq(1).hide();
    $('a.more').click(function(event) {
        event.preventDefault();

        $para.eq(1).animate({
            opacity: 'toggle',
            height: 'toggle'
        }, 'slow');

        var $link = $(this);
        if ($link.text() == 'read more') {
            $link.text('read less');
        }
        else {
            $link.text('read more');
        }
    });

    $('div.label').click(function() {
        var paraWidth = $('div.speech p').outerWidth();
        var $switcher = $(this).parent();
        var switcherWidth = $switcher.outerWidth();
        $switcher
            .css({position: 'relative'})
            .fadeTo('fast', 0.5)
            .animate({
                left: paraWidth - switcherWidth
            }, {
                duration: 'slow',
                queue: false
            })
            .fadeTo('slow', 1.0)
            .slideUp('slow', function() {
                $switcher.css({background: '#f00'});
            })
            .slideDown('slow');
    });

    $para.eq(2)
        .css('border', '1px solid #333')
        .click(function() {
            var $clickedItem = $(this);
            $clickedItem.next().slideDown('slow', function() {
                $clickedItem.slideUp('slow');
            });
        });
    $para.eq(3).css('backgroundColor', '#ccc').hide();


    // pp4-1
    $('body').hide().fadeIn('slow');

    // pp4-2
    $para.hover(function() {
        $(this).css({backgroundColor: 'yellow'});
    }, function() {
        $(this).css({backgroundColor: '#fff'});
    });

    // pp4-3
    $('h2').click(function() {
        $(this)
            .animate({
                opacity: 0.25,
                marginLeft: '20px'
            }, 'slow')
            .queue(function(next) {
                $speech.animate({
                    opacity: 0.5
                }, 'slow');
                next();
            });
    });

    // pp4-4
    $(document).keyup(function(event) {
        var $switcher = $('#switcher');
        switch (event.which.toString()) {
            case '37':
                $switcher.animate({left: '-=20'});
                break;
            case '38':
                $switcher.animate({top: '-=20'});
                break;
            case '39':
                $switcher.animate({left: '+=20'});
                break;
            case '40':
                $switcher.animate({top: '+=20'});
        }
    });
});
