var Drawer = function($) {
  'use strict';
  var e = $('body'),
    f = $('#container'),
    g = $('.drawer-overlay'),
    h = {
      open: function() {
        e.addClass('drawer-open drawer-transition')
      },
      close: function() {
        e.removeClass('drawer-open')
      },
      isOpen: function() {
        return e.hasClass('drawer-open')
      },
      bindOverlay: function() {
        g.on('click', function(a) {
          a.preventDefault(), e.hasClass('drawer-open') && h.close()
        })
      },
      bindAnchors: function() {
        $('.drawer-list a').on('click', function() {
          h.close()
        })
      },
      bindContainerTransEnd: function() {
        f.on('webkitTransitionEnd transitionend oTransitionEnd otransitionend', function() {
          e.hasClass('drawer-open') || e.removeClass('drawer-transition')
        })
      },
      init: function() {
        $('#drawer-button').on('click', this.open);
        h.bindOverlay(), h.bindAnchors(), h.bindContainerTransEnd()
      }
    };
  return {
    init: h.init,
    open: h.open,
    close: h.close,
    isOpen: h.isOpen
  }
}(jQuery);
