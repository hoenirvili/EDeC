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


    /* Causes issues on # on the last section
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
	*/
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
        if(currentY < targetY-distance) // if we still in the hot spot
        {
            scollY = currentY+distance;
            window.scroll(0,scollY); // allow to scroll a specific point on the page
            // note scrollY is a variable that also change very fast
        }
        else
        {
            clearTimeout(animator);
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
    var targetY = document.getElementsById(el).offsetTop;
    var animator = setTimeout('resetScroller(\''+el+'\')',speed);
    if(currentY > targetY)
    {
        scrollY = currentY - distance;
        window.scroll(0, scrollY);
    }
    else
    {
        clearTimeout(animator);
    }
}
$("#about").click(function doScrollEvent() {
    var el = "ToAbout";
    autoScrollTo(el);
});
/*set arrow key to go to top of the page */

//$("#arrow").click(function doArrowScroll(){
//    var e1 = "";
//    resetScroller(el);
//});

function showError(error)
{
	error.style.display ="block";
	error.style.visibility = "visible";
}
function clearError(error1,error2,error3,usernameGroupForm,passwordGroupForm)
{
		error1.style.display ="none";
		error1.style.visibility = "hidden";
		error2.style.display ="none";
		error2.style.visibility = "hidden";
		error3.style.display ="none";
		error3.style.visibility = "hidden";
		$(usernameGroupForm).removeClass("has-error");
		$(passwordGroupForm).removeClass("has-error"); // some jquery
}
function primaryValidate(event)
{
	var error3 = document.getElementById("error3");
	var error2 = document.getElementById("error2");
	var error1 = document.getElementById("error1");

	var username = document.getElementById("username");
	var password = document.getElementById("password");

	var usernameGroupForm = document.getElementsByClassName("form-group")[1];
	var passwordGroupForm = document.getElementsByClassName("form-group")[2];
	var flag = true;
	clearError(error1,error2,error3,usernameGroupForm,passwordGroupForm); // after every submit


	if( (username.value === "") && (password.value ==="")) //the form is Empty
	{
		showError(error3);
		usernameGroupForm.className = usernameGroupForm.className  + " has-error";
		passwordGroupForm.className = passwordGroupForm.className +" has-error";
		flag = false;
	}
	else
		if(username.value === "")
		{
			showError(error1);
			usernameGroupForm.className = usernameGroupForm.className  + " has-error";
			flag = false;
		}
		else
			if(password.value === "")
			{
				showError(error2);
				passwordGroupForm.className = passwordGroupForm.className +" has-error";
				flag = false;
			}
	if(flag === false)
	{
			event.preventDefault(); // if something goes wrong don't do anything
	}
	else return true; // if everything goes well submit the form

}

var formListener = document.getElementById("loginForm");

if(formListener != null)
{
	formListener.addEventListener("submit",primaryValidate);
	//formListener.attachEvent("submit",primaryValidate); manly for internet explorel abouve 9
}

