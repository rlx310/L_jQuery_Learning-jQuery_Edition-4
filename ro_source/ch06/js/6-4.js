//

$(document).ready(function() {
    $('#letter-a').find('a').click(function(event) {
        event.preventDefault();
        $('#dictionary').load('data/a.html');
    });

    $('#letter-b').find('a').click(function(event) {
        event.preventDefault();
        $.getJSON('data/b.json',  function(data) {

        });
    });
});