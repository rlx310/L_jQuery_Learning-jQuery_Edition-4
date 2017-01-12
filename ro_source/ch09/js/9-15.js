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
  * :column()
  * Select all table cells in the same column as the one specified.
******************************************************************************/

(function($) {
    $.fn.column = function() {
        var $cells = $();
        this.each(function() {
            var $td = $(this).closest('td, th');
            if ($td.length) {
                var colNum = $td[0].cellIndex + 1;
                var $columnCells = $td
                    .closest('table')
                    .find('td, th')
                    .filter(':nth-child(' + colNum + ')');
                $cells = $cells.add($columnCells);
            }
        });
        return this.pushStack($cells);
    };
})(jQuery);

/******************************************************************************
 * Script code
******************************************************************************/

$(document).ready(function() {
    var $news = $('#news');
    var $topics = $('#topics');

    function stripe() {
        $news
            .find('tr.alt').removeClass('alt').end()
            .find('tbody').each(function() {
                $(this).children(':visible').has('td')
                    .filter(':group(3)').addClass('alt');
        });
    }
    stripe();

    $topics.find('a').click(function(event) {
        event.preventDefault();
        var topic = $(this).text();

        $topics.find('a').removeClass('selected');
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

    $news.find('td').click(function() {
        $news.find('td.active').removeClass('active');
        $(this).column().addClass('active');
    });
});
