//

$(document).ready(function() {
    $('#letter-a').find('a').click(function(event) {
        event.preventDefault();
        $('#dictionary').load('data/a.html');
    });

    $('#letter-b').find('a').click(function(event) {
        event.preventDefault();
        $.getJSON('data/b.json', function(data) {
            var html = '';
            $.each(data, function(entryIndex, entry) {
                html += '<div class="entry">';
                html += '<h3 class="term">' + entry.term + '</h3>';
                html += '<div class="part">' + entry.part + '</div>';
                html += '<div class="definition">';
                html += entry.definition;

                if (entry.quote) {
                    html += '<div class="quote">';
                    $.each(entry.quote, function(lineIndex, line) {
                        html += '<div class="quote-line">' + line + '</div>';
                    });

                    if (entry.author) {
                        html += '<div class="quote-author">' + entry.author + '</div>';
                    }
                    html += '</div>';
                }
                html += '</div>';
                html += '</div>';
            });
            $('#dictionary').html(html);
        });
    });

    $('#letter-c').find('a').click(function(event) {
        event.preventDefault();
        $.getScript('data/c.js');
    });

    $('#letter-d').find('a').click(function(event) {
        event.preventDefault();
        $.get('data/xml', function(data) {

        });
    });
});