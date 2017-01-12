//

$(document).ready(function() {
    var $books = $('#books').cycle({
        slides: 'li',
        timeout: 2000,
        speed: 200,
        pauseOnHover: true
    });

    if (Cookies.get('cyclePaused')) {
        $books.cycle('pause');
    }

    var $controls = $('<div id="books-controls"></div>').insertAfter($books);
    $('<button>Pause</button>').click(function(event) {
        event.preventDefault();
        $books.cycle('pause');
        Cookies.set('cyclePaused', 'y');
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

    $books.find('.title').resizable();
});
