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
        $.get('data/d.xml', function(data) {
            $('#dictionary').empty();
            $(data).find('entry').each(function() {
                var $entry = $(this);
                var html = '';
                html += '<div class="entry">';
                html += '<h3 class="term">' + $entry.attr('term') + '</h3>';
                html += '<div class="part">' + $entry.attr('part') + '</div>';
                html += '<div class="definition">';
                html += $entry.find('definition').text();

                var $quote = $entry.find('quote');
                if ($quote.length) {
                    html += '<div class="quote">';
                    $quote.find('line').each(function() {
                        html += '<div class="quote-line">' + $(this).text() + '</div>';
                    });

                    if ($quote.attr('author')) {
                        html += '<div class="quote-author">' + $quote.attr('author') + '</div>';
                    }
                    html += '</div>';
                }
                html += '</div>';
                html += '</div>';
                $('#dictionary').append($(html));
            });
        });
    });

    $('#letter-e').find('a').click(function(event) {
        event.preventDefault();
        var requestData = {term: $(this).text()};
        $('#dictionary').load('data/e.php', requestData);
    });

    $('#letter-f').find('form').submit(function(event) {
        event.preventDefault();
        $.get('data/f.php', {'term': $('input[name="term"]').val()}, function(data) {
            $('#dictionary').html(data);
        });
    });
});
