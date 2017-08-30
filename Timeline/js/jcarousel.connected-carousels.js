(function($) {
    // This is the connector function.
    // It connects one item from the navigation carousel to one item from the
    // stage carousel.
    // The default behaviour is, to connect items with the same index from both
    // carousels. This might _not_ work with circular carousels!
    var connector = function(itemNavigation, carouselStage) {
        return carouselStage.jcarousel('items').eq(itemNavigation.index());
    };
	




    $(function() {
        // Setup the carousels. Adjust the options for both carousels here.
        var carouselStage      = $('.carousel-stage').jcarousel();
        var carouselNavigation = $('.carousel-navigation').jcarousel();
		
	
        // We loop through the items of the navigation carousel and set it up
        // as a control for an item from the stage carousel.
        carouselNavigation.jcarousel('items').each(function() {
            var item = $(this);

            // This is where we actually connect to items.
            var target = connector(item, carouselStage);

            item
                .on('jcarouselcontrol:active', function() {
                    carouselNavigation.jcarousel('scrollIntoView', this);
                    item.addClass('active');
					
					selectedItem = item.index()+1;
					if ( selectedItem < 10); 
					selectedItem = ("0" + Number(selectedItem)).slice(-2);
					console.log ("the value of the item is: " + selectedItem);
					document.getElementById( selectedItem ).innerHTML = '<img src="img/icon-' + selectedItem + '_over.png" width="97" height="110" >';

                })
                .on('jcarouselcontrol:inactive', function() {
                    item.removeClass('active');
					
					var last = carouselNavigation.jcarousel('target');
					lastSelected = target.index()+1;
					if ( lastSelected < 10); 
					lastSelected = ("0" + Number(lastSelected)).slice(-2);
					console.log ("the value of the last item is: " + lastSelected);
					document.getElementById( lastSelected ).innerHTML = '<img src="img/icon-' + lastSelected + '.png" width="97" height="110" >';

                })
                .jcarouselControl({
                    target: target,
                    carousel: carouselStage
                });
        });

        // Setup controls for the stage carousel
        $('.prev-stage')
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $('.next-stage')
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });

        // Setup controls for the navigation carousel
        $('.prev-navigation')
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $('.next-navigation')
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });
    });
		
})(jQuery);

// closes the initial splash screen
function closeSplash()
		{
			document.getElementById( "splash" ).style.display = 'none';
		}
		
	
 
