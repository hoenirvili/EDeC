$(window).load(function()
{
	$(".util-pie").fadeOut("slow");
});

// when scrolling 
$(document).ready(function()
{
    $('.bxslider').bxSlider({
        auto: true,
        autoControls: false,
        pager:false,
        nextText: '<i class="fa fa-angle-right"></i>',
        prevText: '<i class="fa fa-angle-left"></i>'
    });


    /* Causes issues on # on the last section*/
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
     }
        else if(window.innerWidth <993 )
        elementTwo.style.opacity = "1";
     }

});
function autoScrollTo(el){
    /*Local*/
    var scollY = 0;
    var distance = 40;
    var speed = 10; //10 miliseconds
    /*=======*/
    var currentY = window.pageYOffset; //return the exact number of pixel the user has scrolled the page
    var targetY = document.getElementById(el).offsetTop; // how many pixel is far away wetween the top element in our case "body"
    /*cancel animation when the user hits the buttom of the page*/
    var bodyHeight = document.body.offsetHeight; // body height of the element DOOM
    var yPos = currentY + window.innerHeight; // the full height of the windows
    var animator = setTimeout('autoScrollTo(\''+el+'\')',speed); // call to run repetly on and on..

    /*if we hit the buttom of the page stop animation*/
    if(yPos > bodyHeight)
        clearTimeout(animator);
    else
    {
        /* the animation will still going */
        if(currentY+2*(distance) < targetY-distance) // if we still in the hot spot
        {
            scollY = currentY+distance;
            window.scroll(0,scollY); // allow to scroll a specific point on the page
            // note scrollY is a variable that also change very fast
        }
        else
        {
            clearTimeout(animator); // stop function setTimeOut to execute when if we are not in the hot spot
        }
    }
}
function resetScroller(el)
{
    /*Local*/
    var scollY = 0;
    var distance = 40;
    var speed = 10; //10 miliseconds

    var currentY = window.pageYOffset;
    var targetY = document.getElementById(el).offsetTop;
    var animator = setTimeout('resetScroller(\''+el+'\')',speed);
    if(currentY > targetY)
    {
        scrollY = currentY - distance;
        window.scroll(0, scrollY);
    }
    else
    {
        console.log('test');
        clearTimeout(animator);
    }
}
$("#about").click(function doScrollEvent() {
    var el= "ToAbout";
    autoScrollTo(el);
    //resetScroller(el);
});
/*set arrow key to go to top of the page */

//$("#arrow").click(function doArrowScroll(){
//    var e1 = "";
//    resetScroller(el);
//});
