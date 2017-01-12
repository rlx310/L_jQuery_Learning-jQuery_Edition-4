//

$(document).ready(function() {
    var $speech = $('div.speech');

    $('#switcher').find('button').click(function() {
        var num = parseFloat($speech.css('fontSize'));

        if (this.id == 'switcher-large') {
            num *= 1.4;
        }
        else if (this.id == 'switcher-small') {
            num /= 1.4;
        }
        $speech.css('fontSize', num + 'px');
    });
});
