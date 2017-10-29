/* 
* ImageLens
* A jQuery plug-in for Lens Effect Image Zooming
* http://www.dailycoding.com/Posts/imagelens__a_jquery_plugin_for_lens_effect_image_zooming.aspx
*/
(function ($) {
    $.fn.imageLens = function (options) {

        var defaults = {
            lensSize: 180,
            borderSize: 0,
            borderColor: "#FFF"
        };
        var options = $.extend(defaults, options);
        var lensStyle = "background-position: 0px 0px;width: " + String(options.lensSize) + "px;height: " + String(options.lensSize)
            + "px;float: left;display: none;border-radius: " + String(options.lensSize / 2 + options.borderSize)
            + "px;border: " + String(options.borderSize) + "px solid " + options.borderColor 
            + ";background-repeat: no-repeat;position: absolute;";

        return this.each(function () {
            var obj = $(this);

            var offset = $(this).offset();
            //console.log('offset left: ' + offset.left + ', offset top: ' + offset.top);

            // Creating lens
            var target = $("<div style='" + lensStyle + "' class='" + options.lensCss + "'>&nbsp;</div>").appendTo($(this).parent());
            var targetSize = target.size();

            // Calculating actual size of image
            var imageSrc = options.imageSrc ? options.imageSrc : $(this).attr("src");
            var imageTag = "<img style='display:none;' src='" + imageSrc + "' />";

            var widthRatio = 0;
            var heightRatio = 0;

            $(imageTag).load(function () {
                widthRatio = $(this).width() / obj.width();
                heightRatio = $(this).height() / obj.height();
            }).appendTo($(this).parent());

            target.css({ backgroundImage: "url('" + imageSrc + "')" });

            target.mousemove(setPosition);
            $(this).mousemove(setPosition);

            // Hide when user moves quickly off image
            target.mouseout(hideLens)
			$(this).mouseout(hideLens)
			$(window).scroll(hideLens);

			function hideLens() {
				target.hide();
			}

            function setPosition(e) {

                var offset = obj.offset();
				var leftPos = parseInt(e.pageX - offset.left);
                var topPos = parseInt(e.pageY - offset.top);
                //console.log('leftPos: ' + leftPos + ', topPos: ' + topPos);


                if (leftPos < 0 || topPos < 0 || leftPos > obj.width() || topPos > obj.height()) {
                    target.hide();
                }
                else {
                    target.show();

                    
                    // position background image inside target
                    leftPos = String(((e.pageX - offset.left) * widthRatio - (target.width() + options.borderSize * 2) / 2) * (-1));
                    topPos = String(((e.pageY - offset.top) * heightRatio - (target.height() + options.borderSize * 2) / 2) * (-1));
                    target.css({ backgroundPosition: leftPos + 'px ' + topPos + 'px' });

                    // position the target
                    leftPos = String((e.pageX - offset.left) - target.width() / 2);
					topPos = String((e.pageY - offset.top) - target.height() / 2);
					target.css({ left: leftPos + 'px', top: topPos + 'px' });
                }
            }
        });
    };
})(jQuery);


/* **************************
 * Our code starts here
 * **************************/
 
 /* 
* Function to animate contact page
*/
function animateContact() { 

	var navi = $('#main-img');

	navi.animate({'opacity':'1'}, 1000, 'linear', function(){ 
		
		if($(window).width() >= 1140){

			navi.imageLens({ imageSrc: "images/asset2.png", lensSize: 300 });
		}
	});
};
 
$(document).ready(function(){
	animateContact();
});