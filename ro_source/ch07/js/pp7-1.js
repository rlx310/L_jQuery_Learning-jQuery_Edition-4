//

$(document).ready(function() {
    var h = document.getElementsByTagName('head')[0],
        link = document.createElement('link');
    link.href = 'css/ui-cupertino/jquery-ui.css';                    // pp7-6
    link.rel = 'stylesheet';
    h.appendChild(link);

    var $books = $('#books').cycle({
        slides: 'li',
        timeout: 2000,
        speed: 500, sync: false,                                // pp7-1
        pauseOnHover: true, loop: 1                             // pp7-5
    }).on('cycle-before', function(event, optionHash) {
        $('#slider').slider('value', optionHash.nextSlide);
    }).on('cycle-finished', function() {                        // pp7-5
        $('button').off().click(function() { $(this).effect('shake', { distance: 10 }) });
        $('#slider').off().css('background', '#555');
    });

    if (Cookies.get('cyclePaused')) {
        $books.cycle('pause');
    }

    var $controls = $('<div id="books-controls"></div>').insertAfter($books);
    $('<button>Pause</button>').click(function(event) {
        event.preventDefault();
        $books.cycle('pause');
        Cookies.set('cyclePaused', 'y', {expires: 30});         //pp7-2
    }).button({
        icons: {primary: 'ui-icon-pause'}
    }).appendTo($controls);
    $('<button>Resume</button>').click(function(event) {
        event.preventDefault();
        var $paused = $('.cycle-paused');
        if ($paused.length) {
            $paused.cycle('resume');
            Cookies.remove('cyclePaused');
        }
        else {
            $(this).effect('shake', {
                distance: 10
            });
        }
    }).button({
        icons: {primary: 'ui-icon-play'}
    }).appendTo($controls);

    $('<div id="slider"></div>').slider({
        min: 0,
        max: $books.find('li').length - 1,
        slide: function(event, ui) {
            $books.cycle(ui.value);
        }, animate: true                                        // pp7-4
    }).appendTo($controls);

    $books.hover(function() {
        $books.find('.title').animate({
            backgroundColor: '#eee',
            color: '#000'
        }, 1000);
    }, function() {
        $books.find('.title').animate({
            backgroundColor: '#000',
            color: '#fff'
        }, 1000);
    });

    $('h1').click(function() {
        $(this).toggleClass('highlighted', 'slow', 'easeInExpo');
    });

    $books.find('.title').resizable({
        handles: 's', containment: 'parent', grid: [0, 10]      // pp7-3
    });
});
