/* ===================================================
 * jquery.fixedscrollingbi-1.0.js
 * PUT repo here
 * ===================================================
 * Copyright 2012 TWAYD, Inc.
 *
 * ===================================================
 *
 * Library to fix a menu on screen after a certain scroll point
 * ========================================================== */

(function($) {
    $(function() {
        // Search for the class "stickToTop", this is what we will be operating on
        // this utility function does not handle multiple block items, although
        // it can be changed to do this
        var stickToTop = $(".stick-to-top:first");
        
        if (stickToTop.length == 0)
            return;

        var view = $(window);

        // In order to "stick" the menu item to the top, a css position of
        // "fixed" is applied to the element. This takes the element out of 
        // the positioning, and the HTML render engine does not use it to calculate
        // positions of other elements. Therefore we need a placeholder element
        // to take up visual space and so avoid "popping". It will also be used
        // correctly work on events
        var placeHolder = stickToTop;

        //Bind to resize as well, because resizing also changes the scrolling
        view.bind("scroll resize", function() {
            var bodyPaddingTop = parseInt($("body").css("padding-top").replace("px",""));
            var offSetMarker = placeHolder.offset().top - bodyPaddingTop;
            var viewTop = view.scrollTop();

            if (viewTop > offSetMarker && stickToTop.css('position') != 'fixed') {
                // This inserts the place holder element, crucial to avoid "popping"
                // and for calculating the offSetMarker
                stickToTop.after("<div id='stickToTopPlaceHolder' style='height:"+stickToTop.outerHeight(true)+"px; background-color:"+stickToTop.css('background-color')+";'></div>");
                
                // Changing the position to fixed secures our element, although it destroys width.
                // Therefore width is reset
                stickToTop.css({'position':'fixed','top':bodyPaddingTop+'px', 'width':stickToTop.width()});
            
                placeHolder = $("#stickToTopPlaceHolder");

            } else if (viewTop <= offSetMarker && stickToTop.css('position') == 'fixed') {
                stickToTop.css({'position':'static'});
                $("#stickToTopPlaceHolder").remove();
                placeHolder = stickToTop;
            }
        });
    });            
})(jQuery);
