//

$(document).ready(function() {
    $('#letter-a').find('a').click(function(event) {
        event.preventDefault();
        $('#dictionary').load('data/a.html');
        alert('Loaded!');
    });
});
