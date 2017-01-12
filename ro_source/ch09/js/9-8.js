/******************************************************************************
 * Plugin code
******************************************************************************/

/******************************************************************************
 * :group()
 * Select n elements, skip n elements, etc.
******************************************************************************/

(function($) {
    $.extend($.expr[':'], {
       group: function(element, index, matches, set) {
           var num = parseInt(matches[3], 10);
           if (isNaN(num)) {
               return false;
           }
           return index % (num * 2) < num;
       }
    });
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
                .filter(function(index) {
                    return (index % 4) < 2;
                }).addClass('alt');
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
});
