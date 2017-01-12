/******************************************************************************
 * Plugin code
******************************************************************************/

/******************************************************************************
 * Script code
******************************************************************************/

$(document).ready(function() {
    $('#topics').find('a').click(function(event) {
        event.preventDefault();
        var topic = $(this).text();

        $('#topics').find('a.selected').removeClass('selected');
        $(this).addClass('selected');


        var $news = $('#news');
        $news.find('tr').show();
        if (topic != 'All') {
            $news.find('tr:has(td):not(:contains("' + topic + '"))')
                .hide();
        }
    });
});
