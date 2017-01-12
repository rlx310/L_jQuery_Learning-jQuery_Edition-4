//

$(document).ready(function() {
    $('div.chapter a[href*="wikipedia"]').attr({
        rel: 'external',
        title: function() {
            return 'Learn more about ' + $(this).text() + ' at Wikipedia.';
        },
        id: function(index) {
            return 'wikilink-' + index;
        }
    });
    // pp5-1
    $('<a href="#top">back to top</a>').insertAfter('div.chapter p:gt(2)');
    $('<a id="top"></a>').prependTo('body');

    var $notes = $('<ol id="notes"></ol>').insertBefore('#footer');
    $('span.footnote').each(function(index) {
        $(this)
            .before(['<a href="#footnote-', index + 1, '" id="context-', index + 1, '" class="context">', '<sup>', index + 1, '</sup></a>'].join(''))
            .appendTo($notes)
            .append(['&nbsp;(<a href="#context-', index + 1, '">context</a>)'].join(''))
            .wrap('<li id="footnote-' + (index + 1) + '"></li>');
    });

    $('span.pull-quote').each(function() {
        var $parentParagraph = $(this).parent('p');
        $parentParagraph.css('position', 'relative');

        var $clonedCopy = $(this).clone();
        $clonedCopy
            .addClass('pulled')
            .find('span.drop')
                .html('&hellip;')
                .end()
            .text($clonedCopy.text())
            .prependTo($parentParagraph);
    });

    //pp5-2
    var $prev;
    $('.chapter').click(function(event) {
        var $target = $(event.target);
        if ($target.attr('href') == '#top') {
            $target.after('<p class="bookmark">You were here</p>');
            if ($prev) {
                $prev.next().remove();
            }
            $prev = $target;
        }
    });
    // $('a:contains("back to top")').click(function(event) {
    //     $(this).after('<p class="bookmark">You were here</p>');
    //     if ($prev) {
    //         $prev.next().remove();
    //     }
    //     $prev = $(event.target);
    // });

    //pp5-3 (commented out for 5-4)
    var $author = $('#f-author');
    // $author.click(function() {
    //     $(this).html('<b>' + $(this).text() + '</b>').off();
    // });

    // 5-4
    $author.click(function() {
        if ($(this).children().is('b')) {
            $(this).html($(this).text());
        }
        else {
            $(this).html('<b>' + $(this).text() + '</b>');
        }
    });

    //5-5
    $('.chapter p').attr({
        class: function(index, oldValue) {
            return oldValue
                ? oldValue + ' inhabitants'
                : 'inhabitants';
        }
    });

    // $('div.chapter').find('p').each(function() {
    //     var currentClass = $(this).attr('class');
    //
    //     currentClass
    //         ? $(this).attr('class', currentClass + ' inhabitants')
    //         : $(this).attr('class', 'inhabitants');
    // });
});