/**
 * Created by jesse on 4/9/2014.
 */
/** version: v0.2                 ...*/

/**
 *
 * USAGE:

    <style type="text/scss">
        #page_scroller {
            position: fixed;
            width: 41px;
            height: 41px;
            cursor: pointer;
            background: url("scroller-bg.png") no-repeat left top transparent;
            &.reverse {
                background-position: left bottom;
            }
        }
    </style>

    <div id="page_scroller"></div>

    <script type="text/javascript" src="latest-jquery.js"></script>
    <script type="text/javascript" src="scroller.js"></script>
    <script type="text/javascript">
        jQuery(document).ready(function(){
            jQuery("#page_scroller").scroller();
        });
    </script>
 *
 */

jQuery.fn.scroller = function(options) {
    return this.each(function(){
        settings = jQuery.extend({
            pageDivisions : 3,
            scrollCounter: 0,
            scrollStep : 0,
            that : this
        }, options);

        jQuery(this).css({
           top: (jQuery(window).height() - 100) + "px",
           left: (jQuery(window).width() / 2) - (jQuery(this).width() / 2) + "px"
        });

        jQuery(this).click(function(){
            var documentheight = jQuery(document).height();
            settings.scrollStep = (documentheight <= jQuery(window).height()) ? 0 : Math.floor(documentheight / settings.pageDivisions);
            if(jQuery(this).hasClass('reverse')) {
                jQuery("body, html").animate({
                    scrollTop: "0"
                }, 2e3);
            } else {
                jQuery("body, html").animate({
                    scrollTop: "+=" + settings.scrollStep + "px"
                }, 2e3);
                settings.scrollCounter += 1;
                if (settings.scrollCounter == settings.pageDivisions - 1) {
                    jQuery(this).addClass("reverse");
                    settings.scrollCounter = 0;
                }
            }
        });

        jQuery(window, "html, body").scroll(function() {
            if (jQuery(document).scrollTop() == 0) {
                jQuery(settings.that).removeClass("reverse");
            } else if ( settings.scrollStep * settings.scrollCounter > jQuery(window).height() ){
                jQuery(settings.that).addClass("reverse");
            }
        })
    });
}