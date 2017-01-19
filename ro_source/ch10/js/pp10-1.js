//

(function($) {
    $.event.special.throttledScroll = {
        setup: function(data) {
            var timer = 0;
            $(this).on('scroll.throttledScroll', function(event) {
                console.log(timer);
                if (!timer) {
                    timer = setTimeout(function() {
                        $(this).triggerHandler('throttledScroll');
                        timer = 0;
                    }, 250);
                }
            });
        },

        teardown: function() {
            $(this).off('scroll.throttledScoll');
        }
    };

    $(document).on('mouseenter mouseleave', 'div.photo', function(event) {
        var $details = $(this).find('.details');
        if (event.type == 'mouseenter') {
            $details.fadeTo('fast', 0.7);
        }
        else {
            $details.fadeOut('fast');
        }
    });

    $(document).on('nextPage', function(event, scrollToVisible) {
        var url = $('#more-photos').attr('href');
        $('.loading').show();                                           // pp 10-3
        if (url) {
            $.get(url, function(data) {
                var $data = $(data).appendTo('#gallery');
                if (scrollToVisible) {
                    var newTop = $data.offset().top;
                    $(window).scrollTop(newTop);
                }
                $(document).trigger('pageLoaded');                      // pp 10-2
                checkScrollPosition();
            });
        }
    });

    var pageNum = 1;
    $(document).on('nextPage', function() {
        pageNum++;
        if (pageNum < 20) {
            $('#more-photos').attr('href', 'pages/' + pageNum + '.html');
        }
        else {
            $('#more-photos').remove();
            $('.loading').remove();                                     // pp 10-2
        }
    });

    function checkScrollPosition() {
        var distance = $(window).scrollTop() + $(window).height();
        if ($('#container').height() <= distance) {
            $(document).trigger('nextPage');
        }
    }

    $(document).ready(function() {
        $('#more-photos').click(function(event) {
            event.preventDefault();
            $(this).trigger('nextPage', [true]);
        });

        $(window)
            .on('throttledScroll', checkScrollPosition)
            .trigger('throttledScroll');
    });

    // pp10-1
    $(document).ready(function() {
        $('#gallery').on('click', 'div.photo', function() {
            $(this).toggleClass('selected');
        });
    });

    // pp10-2
    $(document).on('pageLoaded', function() {
        console.log('new page has loaded:', pageNum);
        $('.loading').hide();                                           // pp10-3
    });
    $(document).ready(function() {
        $('#container').prepend('<div class="loading">Loading</div>');
    });

    // pp10-4 / pp10-5
    $(document).ready(function() {
        var mouseTimer = 0;
        $('#gallery').on('mousemove', 'div.photo', function(event) {
            if (!mouseTimer) {
                mouseTimer = setTimeout(function() {
                    console.log(event.pageX, event.pageY);
                    mouseTimer = 0;
                }, 200);
            }
        });
    });

    // pp10-6

    $.event.special.tripleClick = {
        setup: function() {
            var timer = 0;
            var clicks = 0;
            $(this).on('click.tripleClick', function() {
                if (!timer) {
                    timer = setTimeout(function() {
                        timer = 0;
                        clicks = 0;
                    }, 500);
                }
                clicks++;
                if (clicks == 3) {
                    $(this).triggerHandler('tripleClick');
                }
            });
        },
        teardown: function() {
            $(this).off('click.tripleClick');
        }
    };

    $(document).ready(function() {
        $('h1').on('tripleClick', function() {
            $('#gallery').toggleClass('hide');
        });
    });

})(jQuery);
