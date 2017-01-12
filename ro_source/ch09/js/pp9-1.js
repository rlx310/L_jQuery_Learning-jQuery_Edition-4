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
    $.expr.setFilters.contains_exactly = function(elements, argument, not) {
        var resultElements = [];
        var regex = new RegExp('^' + argument + '$');                           //pp9-2
        for (var i = 0; i < elements.length; i++) {
            var test = elements[i].textContent.match(regex) || false;
            if ((!not && test) || (not && !test)) {
                resultElements.push(elements[i]);
            }
        }
        return resultElements;
    };
})(jQuery);

/******************************************************************************
  * .column()
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
        $news.find('tr.alt, tr.alt-2').removeClass('alt alt-2');
        $news.find('tbody').each(function() {
            $(this).children(':visible').has('td')
                .filter(function(index) {                           // pp9-1
                    return (index % 3) == 1;
                }).addClass('alt').end()
                .filter(function(index) {
                    return (index % 3) == 2;
                }).addClass('alt-2');
        });
    }
    stripe();

    $topics.find('a').click(function(event) {
        event.preventDefault();
        var topic = $(this).text();

        $topics.find('a.selected').removeClass('selected');
        $(this).addClass('selected');

        $news.find('tr').show();                                    // pp9-4
        if (topic != 'All') {
            $news
                .find('tr:has(td)')
                    .children(':nth-child(4)')
                    .not(':contains_exactly("' + topic + '")')
                .parent()
                .hide();
        }
        stripe();
    });

    $('#release').nextAll().addBack().addClass('highlight');

    $news.find('td').click(function() {
        $news.find('td.active').removeClass('active');
        $(this).column().addClass('active');
    });

    /*  pp9-5

        $('#release').closest('table');
        195,000 ops/sec
        ~ 10% slower

        $('#release').parent('table');
        170,000 ops/sec
        fastest
    */

    /*  pp9-6

    var test61, test62, test63, test64;
    test61 = $news.find('td:last-child');           console.log(test61);    // fastest 20,000 ops/sec
    test62 = $news.find('td:nth-child(4)');         console.log(test62);    // fastest 20,000 ops/sec
    test63 = $news.find('tr:has(td)').map(function() {
        return $(this).children().last().get();
    });                                             console.log(test63);    // slowest 2000 ops/sec
    test64 = $news.find('tr:has(td)').map(function() {
        return $(this).children(':last').get();
    });                                             console.log(test64);    // slowest 1000 ops/sec

    */
});
