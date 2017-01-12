/******************************************************************************
 * Plugin code
******************************************************************************/

/******************************************************************************
 * $.sum()
 * Return the total of the numeric values in an array/object.
******************************************************************************/

(function($) {
$.mathUtils = {
    sum: function(array) {
        var total = 0;

        $.each(array, function(index, value) {
            value = $.trim(value);
            value = parseFloat(value) || 0;

            total += value;
        });
        return total;
    },
    average: function(array) {
        if ($.isArray(array)) {
            return $.mathUtils.sum(array) / array.length;
        }
        return '';
    }
};
})(jQuery);

/******************************************************************************
  * .swapClass()
  * Exchange one class for another on the selected elements.
******************************************************************************/

(function($) {
$.fn.swapClass = function(class1, class2) {
    return this.each(function() {
        var $element = $(this);
        if ($element.hasClass(class1)) {
            $element.removeClass(class1).addClass(class2);
        }
        else if ($element.hasClass(class2)) {
            $element.removeClass(class2).addClass(class1);
        }
    });
};
})(jQuery);

/******************************************************************************
  * .shadow()
  * Create a shadow effect on any element by brute-force copying.
******************************************************************************/

(function($) {
$.fn.shadow = function(opts) {
    var options = $.extend({}, $.fn.shadow.defaults, opts);

    return this.each(function() {
        var $originalElement = $(this);
        for (var i = 0; i < options.copies; i++) {
            var offset = options.copyOffset(i);
            $originalElement
                .clone()
                .css({
                    position: 'absolute',
                    left: $originalElement.offset().left + offset.x,
                    top: $originalElement.offset().top + offset.y,
                    margin: 0,
                    // zIndex: -1,
                    zIndex: options.zIndex,                                 //pp8-2
                    opacity: options.opacity
                })
                .appendTo('body');
        }
    });
};
$.fn.shadow.defaults = {
    copies: 5,
    opacity: 0.1,
    zIndex: -1,
    copyOffset: function(index) {                                           //pp8-2
        return {x: index, y: index};
    }
};
})(jQuery);

/******************************************************************************
  * .tooltip()
  * A simple jQuery UI tooltip widget.
******************************************************************************/

(function($) {
$.widget('ljq.tooltip', {
    options: {
        offsetX: 10,
        offsetY: 10,
        content: function() {                                           //pp8-6
            var tooltipText = $(this).data('tooltip-text');
            var url = $(this).attr('href');
            $.ajax({
                url: url,
                type: 'get',
                async: false,
                dataType: 'html',
                success: function(data) {
                    tooltipText = data;
                }
            });
            return tooltipText;
        }
    },
    _create: function() {
        this._tooltipDiv = $('<div></div>')
            .addClass('ljq-tooltip-text ui-widget ui-state-highlight ui-corner-all')
            .hide().appendTo('body');
        this.element
            .addClass('ljq-tooltip-trigger')
            .on('mouseenter.ljq-tooltip', $.proxy(this._open, this))
            .on('mouseleave.ljq-tooltip', $.proxy(this._close, this));
    },
    destroy: function() {
        this._tooltipDiv.remove();
        this.element
            .removeClass('ljq-tooltip-trigger')
            .off('.ljq-tooltip');
        $.Widget.prototype.destroy.apply(this, arguments);
    },
    open: function() {
        this._open();
    },
    close: function() {
        this._close();
    },
    _open: function() {
        if (!this.options.disabled) {
            var elementOffset = this.element.offset();
            this._tooltipDiv.css({
                position: 'absolute',
                left: elementOffset.left + this.options.offsetX,
                top: elementOffset.top + this.element.height() + this.options.offsetY
            }).text(this.options.content.call(this.element[0]));
            this._tooltipDiv.show();
            this._trigger('open');
            this.tooltipOpen = true;                                //pp8-3
            console.log(this.isOpen(), this.element.text());
            if (this.options.effect) {                              //pp8-6
                this._tooltipDiv.effect(this.options.effect, {duration: 2000});
            }
        }
    },
    _close: function() {
        this._tooltipDiv.hide();
        this._trigger('close');
        this.tooltipOpen = false;                                   //pp8-3
        console.log(this.isOpen(), this.element.text());
    },
    isOpen: function() {                                            //pp8-3
        return this.tooltipOpen;
    }
});
})(jQuery);

/******************************************************************************
 * pp8-1
******************************************************************************/

(function($) {
$.fn.slideFadeOut = function() {
    $.fn.slideFadeIn.height = this.css('height');
    this.animate({
        opacity: '0',
        height: '0'
    });
    return this;
};
$.fn.slideFadeIn = function() {
    this.animate({
        opacity: '1',
        height: $.fn.slideFadeIn.height
    });
    return this;
};
$.fn.slideFadeToggle = function() {
    this.animate({
        opacity: 'toggle',
        height: 'toggle'});
    return this;
};
$.fn.slideFadeIn.height = 0;
})(jQuery);

/******************************************************************************
 * Script code
******************************************************************************/

$(document).ready(function() {
    var $inventory = $('#inventory').find('tbody');
    var quantities = $inventory.find('td:nth-child(2)')
        .map(function(index, qty) {
            return $(qty).text();
        }).get();

    var prices = $inventory.find('td:nth-child(3)')
        .map(function(index, qty) {
            return $(qty).text();
        }).get();

    var sum = $.mathUtils.sum(quantities);
    var average = $.mathUtils.average(prices);
    $('#sum').find('td:nth-child(2)').text(sum);
    $('#average').find('td:nth-child(3)').text(average.toFixed(2));

    $('table').click(function() {
        $('tr').swapClass('one', 'two');
    });

    $.fn.shadow.defaults.copies = 10;
    $('h1').shadow({
        copyOffset: function(index) {
            return {x: -index, y: index};
        }
    });

    $('a').tooltip({
        effect: 'explode'   // pp8-6
    });

    // pp8-1
    $inventory.find('td:nth-child(3)').on('click', function() {
        // $(this).slideFadeToggle().slideFadeToggle();
        $(this).slideFadeOut().slideFadeIn();
    });

    // pp8-4
    $(document).on('tooltipopen', function(event) {
        console.log('tooltip triggered text ->', event.target.textContent);
    });
});
