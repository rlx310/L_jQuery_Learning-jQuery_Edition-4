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
        $('.cycle-paused').cycle('resume');
        Cookies.remove('cyclePaused');
    }).appendTo($controls);
});
