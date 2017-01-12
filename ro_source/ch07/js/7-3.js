//

$.fn.cycle.defaults.timeout = 10000;
$.fn.cycle.defaults.random = true;

$(document).ready(function() {
    $('#books').cycle({
        slides: 'li',
        timeout: 2000,
        speed: 200,
        pauseOnHover: true
    });
});