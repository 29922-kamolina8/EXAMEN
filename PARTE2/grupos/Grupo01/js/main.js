$(document).ready(function() {
    
    // Ejemplo de cómo podrían inicializar sus tooltips de Bootstrap 5
    // var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    // var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    //   return new bootstrap.Tooltip(tooltipTriggerEl)
    // })

});

// Scroll-reveal: reveal elements with class `reveal` when they enter the viewport
(function($){
    var $window = $(window);
    var revealOffset = 80; // px from bottom of viewport to trigger

    function revealElements() {
        $('.reveal').each(function(i, el){
            var $el = $(el);
            if ($el.hasClass('visible')) return; // already visible

            var elTop = $el.offset().top;
            var windowBottom = $window.scrollTop() + $window.height();

            if (elTop < windowBottom - revealOffset) {
                // optional cascading delays
                if (!$el.data('reveal-delay')) {
                    $el.addClass('visible');
                } else {
                    setTimeout(function(){ $el.addClass('visible'); }, $el.data('reveal-delay'));
                }
            }
        });
    }

    // Update on load, scroll and resize
    $window.on('load scroll resize', revealElements);

    // Smoothly update active state of page-sections nav when clicking anchors
    $('.page-sections-nav a[href^="#"]').on('click', function(e){
        e.preventDefault();
        var target = this.hash;
        var $target = $(target);
        if ($target.length) {
            // compute offset so the sticky nav and topbar don't cover the target
            var topbarHeight = 70; // keep consistent with CSS
            var navHeight = $('.page-sections-nav').outerHeight() || 0;
            var offset = topbarHeight + navHeight + 8; // small gap
            $('html, body').animate({ scrollTop: $target.offset().top - offset }, 500);
        }
    });

})(jQuery);