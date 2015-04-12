$(window).load(function(){
	$(".util-pie").fadeOut("slow");
});

// when scrolling 

var elementOne = document.getElementById("el1");
var elementTwo = document.getElementById("el2");
var elementThree = document.getElementById("el3");


if( (elementOne != null) && (elementTwo !=null) && (elementThree!=null) )
	window.addEventListener("scroll",whenScrolling())


function whenScrolling()
{
	if( window.scrollY >= 540 && window.scollY <= 800)
	{
		var op = 0.1;
		elementTwo.style.display = 'block';
		
		var timer = setInterval(function (){

			if(op >= 1)
				clearInterval(timer);
			elementTwo.style.opacity = op;
			elementTwo.style.filter = 'alpha(opacity' + op *100 + ")";
			op+=op*0.1;

		},10);
	} // if statemant

}

