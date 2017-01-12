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

    $('<a href="#top">back to top</a>').insertAfter('div.chapter p');
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
            .prependTo($parentParagraph);
    })
});