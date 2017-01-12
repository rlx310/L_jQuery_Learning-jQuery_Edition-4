//

$(document).ready(function() {
    var h = document.getElementsByTagName('head')[0],
        link = document.createElement('link');
    link.href = 'css/ui-le-frog/jquery-ui.css';
    link.rel = 'stylesheet';
    h.appendChild(link);

    var $books = $('#books').cycle({
        slides: 'li',
        timeout: 2000,
        speed: 200,
        pauseOnHover: true
    }).on('cycle-before', function(event, optionHash) {
        $('#slider').slider('value', optionHash.nextSlide);
    });

    if (Cookies.get('cyclePaused')) {
        $books.cycle('pause');
    }

    var $controls = $('<div id="books-controls"></div>').insertAfter($books);
    $('<button>Pause</button>').click(function(event) {
        event.preventDefault();
        $books.cycle('pause');
        Cookies.set('cyclePaused', 'y');
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
        }
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
        handles: 's'
    });
});
