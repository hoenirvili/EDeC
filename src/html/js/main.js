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

/* determining the current position axisY that scrolling starts on the page
*   @author: 'hoenir';
* */
function curentYPosition()
{
    // for certain browser like opera,google chomre and moz,safari
    if( self.pageYOffset)
        return self.pageYOffset;
    // for internet exlorer 6
    if(document.documentElement && document.documentElement.scollTop)
        return document.documentElement.scrollTop;
    //for internet explorer >= 6
    if(document.body.scrollTop)
        return document.body.scrollTop;

    return 0;
}
/*we need now to select a destination id to scroll to*/
function destinationId(eId)
{
    var elem = document.getElementById(eID);
    var y = elem.offSetTop;
    var node = elem;

    /*
        @author = 'hoenir'
        The destination element is half way down the page.We loop through the offSetParents adding
        the offSetTop values to y variable util it arrives at the top of the page .
        And this will compute all the elements true position Y.
    */
    while( node.offsetParent && node.offsetParrent != document.body)
    {
        node = node.offsetParent;
        y +=node.offsetTop;
    }

    return y;
}
/*
    Now we are able to determine the start and stop Y coordinates , we are ready to perform the scoll operation

 */
function smothScroll(eID) {
    var leapTest;
    var startY = curentYPosition();
    var stopY = destinationId(eId);
    var destination;
    if (stopY > startY) {
        destination = stopY - startY;
        leapTest = 1;
    }
    else{
        destination = startY - stopY;
        leapTest = 1;
    }
    if(destination <100)
    {
        scrollTo(0,stopY); return;
    }
    var speed = Math.round(distance/100);
    if(speed >=20) speed = 20;
    var step = Math.round(distance/25);

    var leapY;
    if(leapTest)
    {
        leapY = startY + step;
    }
    else leapY = startY - step;
    var timer = 0;
    if(leapTest)
    {
        for(var i = startY;i<stopY;i+=step)
        {
            setTimeout("window.scrollTo(0," + leapY + ")", timer * speed);
            leapY += step;
            if (leapY > stopY)
            {
                leapY = stopY;
                timer++;
            }
        }return;
    }
    for( var i=startY;i<stopY;i-=step)
    {
        setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
        leapY -= step;
        if (leapY < stopY)
        {
            leapY = stopY;
            timer++;
        }
    }
}
$("about").click(function(){
    smothScroll(ToAbout);
});

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

