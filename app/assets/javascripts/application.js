// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .


$(document).ready(function() {
	// Company Timeline

  	function animateNumbers(scrollingDown){
      scrollingDown = typeof scrollingDown !== 'undefined' ? scrollingDown : true; // default value to true
      if (scrollingDown){
        $({someValue: 0}).animate({someValue: 100}, {
            duration: 1500,
            easing:'swing', // can be anything
            step: function() { // called on every step
                // Update the element's text with rounded-up value:
              var minFree = 0;
              var maxFree = 256;
              var free = minFree + (maxFree-minFree)*(this.someValue/100);
              
              var minTotal = 250;
              var maxTotal = 512;
              var total = minTotal + (maxTotal-minTotal)*(this.someValue/100);
              $('#labelFreeSpace').text(Math.round(free).toString()+" GB free of "+Math.round(total).toString()+" GB");
              $('#labelDisk').text(Math.round(total).toString()+" GB");
            }
        });
      } else {
        $({someValue: 100}).animate({someValue: 0}, {
            duration: 1500,
            easing:'swing', // can be anything
            step: function() { // called on every step
                // Update the element's text with rounded-up value:
              var minFree = 0;
              var maxFree = 256;
              var free = minFree + (maxFree-minFree)*(this.someValue/100);
              
              var minTotal = 256;
              var maxTotal = 512;
              var total = minTotal + (maxTotal-minTotal)*(this.someValue/100);
              $('#labelFreeSpace').text(Math.round(free).toString()+" GB free of "+Math.round(total).toString()+" GB");
              $('#labelDisk').text(Math.round(total).toString()+" GB");
            }
        });        
      }
    }

  
	var macOn = $("#macbook .on");
	var macOff = $("#macbook .off");
	var scrollPos = 0;
	var scrolldif = 0;
	var scrollCurrent = 0;
 
	var $win = $(window),
        $explosion = $('.interactive'),
        $parts = null,
        explosionY = 0,
        isFirefox = navigator.userAgent.match(/Firefox/) !== null;


    if ($('.timeline').hasClass('timeline')) {
        $parts = setPartsData();

        var animationHandler = function() {
            pencilPartsHandler();

            // quick fix to disable turn animation in Firefox
            if ( isFirefox == false) {
                // pencilTurnHandler();
            }
        };

        $(document).scroll(animationHandler);
        $win.resize(animationHandler);
    }

    function fadeText($el) {
        $el.toggleClass('locked', explosionY > $el.data('fade'));
    }

    function setPartsData() {
        return $explosion.find('li').each(function() {
            var $part = $(this),
                anim = $part.attr('data-anim').split('|');

            $part
                .data('name',     $part.find('.part-name'))
                .data('desc',     $part.find('.part-desc'))
                .data('isSensor', $part.hasClass('pencil-sensor'))
                .data('origin',   parseInt(anim[0], 10))
                .data('start',    parseInt(anim[1], 10))
                .data('fade',     parseInt(anim[2], 10));
        });
    }

    function movePart($el) {
        var origin = $el.data('origin'),
            start = $el.data('start'),
            y = (explosionY > start) ? origin + (explosionY - start) : origin;

        // special case for transition easing
        if (explosionY > 1548 && $el.data('isSensor')) {
            y -= (1 - (1770 - pencilY) / 225) * 140;
        }

        $el.css('top', Math.min(0, y));
    }

    function pencilPartsHandler() {
        explosionY = -($explosion.offset().top - ($win.scrollTop() + $win.height()));

        $parts.each(function() {
            var $part = $(this);

            movePart($part);
            fadeText($part);
        });
    }
})