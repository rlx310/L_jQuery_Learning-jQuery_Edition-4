//

$.fx.speeds._default = 250;
$.fx.speeds.zippy = 1;                         // pp 10-1

$(document).ready(function() {
    $('#fx-toggle').show().on('click', function() {
        $.fx.off = !$.fx.off;
    });

    var $movable = $('<div id="movable"></div>')
        .appendTo('body');

    var bioBaseStyles = {
            display: 'none',
            height: '5px',
            width: '25px',
            opacity: 1                      // pp 10-5
        },
        bioEffects = {
            duration: 'zippy',              // pp 10-1
            easing: 'easeOutQuart',
            specialEasing: {
                opacity: 'linear'
            }
    };

    function showBio() {
        var $member = $(this).parent(),
            $bio = $member.find('p.bio'),
            startStyles = $.extend(bioBaseStyles, $member.offset()),
            endStyles = {
                width: $bio.width(),
                top: $member.offset().top + 5,
                left: $member.width() + $member.offset().left - 5,
                opacity: 'show'
            };

        $movable
            .html($bio.clone())
            .css(startStyles)
            // .delay(2000)                                                    // pp 10-4
            .animate(endStyles, bioEffects)
            .animate({height: $bio.height()}, {easing: 'easeOutQuart'});
    }

    function showDetails() {
        var $member = $(this).parent();
        if ($member.hasClass('active')) {
            $member.stop().parent().parent().next().animate({height: 0, width: 0, opacity: 0}); // 10-5
            return;
        }
        $movable.fadeOut();

        $('div.member.active')
            .removeClass('active highlight')
            .children('div').fadeOut();

        $member.addClass('active');
        $member.find('div').css({
            display: 'block',
            left: '-300px',
            top: 0
        }).each(function(index) {
            $(this).animate({
                left: 0,
                top: 25 * index
            }, {
                duration: 1000,
                specialEasing: {
                    top: 'easeInBounce'         // pp 10-2
                }
            });
        }).promise().done(showBio, function() {$member.addClass('highlight')} );    // pp 10-3
    }

    $('div.member').on('mouseenter mouseleave', function(event) {
        var size = event.type == 'mouseenter' ? 85 : 75;
        var pad  = event.type == 'mouseenter' ? 0 : 5;
        $(this).find('img').stop().animate({
            width: size,
            height: size,
            paddingTop: pad,
            paddingLeft: pad
        });
    }).find('img').click(showDetails);
});
