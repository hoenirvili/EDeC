$(window).load(function()
{
	$(".util-pie").fadeOut("slow");
});

// when scrolling 
$(document).ready(function()
{

	var elementOne = document.getElementById("el1");
	var elementTwo = document.getElementById("el2");
	var elementThree = document.getElementById("el3");

	if(elementOne!=null && elementThree !=null && elementTwo!=null)
    {
		if(window.innerWidth >= 993)
        {
			$(window).scroll(function(event)
            {
					var y = $(this).scrollTop();

					if(y >=300)
					{
						$(elementOne).addClass('animate');
						$(elementThree).addClass('animate');
						$(elementTwo).fadeIn('slow',function()
                        {
							$(this).fadeTo("slow",1);
						});
					}
			});
		}else if(window.innerWidth <993 )
			  elementTwo.style.opacity = "1";
	}
});


$(function() {
    $('a[href*=ToAbout]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});

