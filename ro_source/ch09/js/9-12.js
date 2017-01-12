/******************************************************************************
 * Plugin code
******************************************************************************/

/******************************************************************************
 * :group()
 * Select n elements, skip n elements, etc.
******************************************************************************/

(function($) {
    $.expr.setFilters.group = function(elements, argument, not) {
        var resultElements = [];
        for (var i = 0; i < elements.length; i++) {
            var test = i % (argument * 2) < argument;
            if ((!not && test) || (not && !test)) {
                resultElements.push(elements[i]);
            }
        }
        return resultElements;
    };
})(jQuery);

/******************************************************************************
 * Script code
******************************************************************************/

$(document).ready(function() {
    var $news = $('#news');
    var $topics = $('#topics');

    function stripe() {
        $news.find('tr.alt').removeClass('alt');
        $news.find('tbody').each(function() {
            $(this).children(':visible').has('td')
                .filter(':group(3)').addClass('alt');
        });
    }
    stripe();

    $topics.find('a').click(function(event) {
        event.preventDefault();
        var topic = $(this).text();

        $topics.find('a.selected').removeClass('selected');
        $(this).addClass('selected');

        $news.find('tr').show();
        if (topic != 'All') {
            $news.find('tr:has(td)').not(function() {
                return $(this).children(':nth-child(4)').text() == topic;
            }).hide();
        }
        stripe();
    });

    $('#release').nextAll().addBack().addClass('highlight');
});
