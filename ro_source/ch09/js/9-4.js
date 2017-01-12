/******************************************************************************
 * Plugin code
******************************************************************************/

/******************************************************************************
 * Script code
******************************************************************************/

$(document).ready(function() {
    $('#news').find('tr:nth-child(even)').addClass('alt');

    $('#topics').find('a').click(function(event) {
        event.preventDefault();
        var topic = $(this).text();

        $('#topics').find('a.selected').removeClass('selected');
        $(this).addClass('selected');

        var $news = $('#news');
        $news.find('tr').show();
        if (topic != 'All') {
            $news.find('tr:has(td)').not(function() {
                return $(this).children(':nth-child(4)').text() == topic;
            }).hide();
        }
    });
});
