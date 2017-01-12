//

$(document).ready(function() {
    var $switcher = $('#switcher');
    window.$buttons = $switcher.find('button');

    $switcher.find('h3').click(function() {
        $buttons.toggleClass('hidden');
    });
});
$(document).ready(function() {
    $('#switcher-default').addClass('selected');

    $buttons.click(function() {
        var bodyClass = this.id.split('-')[1];
        $('body').removeClass().addClass(bodyClass);

        $buttons.removeClass('selected');
        $(this).addClass('selected');
    });
});