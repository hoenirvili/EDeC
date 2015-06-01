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




$(document).ready(function(){
    $('#registerForm').formValidation({
       framework: 'bootstrap',
       icon:
       {
           valid: 'glyphicon glyphicon-ok',
           invalid: 'glyphicon glyphicon-remove',
           validating: 'glyphicon glyphicon-refresh'
       },
        fields:
        {
            registerUsername:
            {
                validators:
                {
                    notEmpty:
                    {
                        message: 'Username is required'
                    },
                    stringLength:
                    {
                        min: 6,
                        max: 30,
                        message: 'The username must be more than 6 and less than 30 characters long'
                    },
                    regexp:
                    {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: 'The username can only consist of alphabetical, number, dot and underscore'
                    }

                }
            },
            email:
            {
                validators:
                {
                    notEmpty:
                    {
                        message: 'Email is required'
                    },
                    emailAddress:
                    {
                        message: 'The input is not a valid email adress'
                    }
                }
            },
            registerPassword:
            {
                validators:
                {
                    notEmpty:
                    {
                        message: 'The password is required'
                    },
                    different:
                    {
                        field: 'username',
                        message: 'The password cannot be the same as username'
                    }
                }
            },
            repeatRegisterPassword:
            {
                validators:
                {
                    notEmpty:
                    {
                        message: 'The password is required'
                    },
                    different:
                    {
                        field: 'username',
                        message: 'The password cannot be the same as username'
                    }
                }
            },
            gender:
            {
                validators:
                {
                    notEmpty:
                    {
                        message: 'The gender is required'
                    }
                }
            },
            birthday:
            {
                validators:
                {
                    notEmpty:
                    {
                        message: 'The date of birth is required'
                    },
                    date:
                    {
                        format: 'DD/MM/YYYY',
                        message: 'The date of birth is not valid'
                    }
                }
            }//birthday
        }//fields
    });//formvalidation id
}); //main function
function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    if(sPageURL =='') return '';
    var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            }
        }

    return '';
}


$(document).ready(function() {
    if($('body').hasClass('search')) {
        searched_text = getUrlParameter('s')
        if (searched_text != '') {
            $('body #products-search').highlight(searched_text, {
                caseSensitive: false
            });
        }
    }

});
$(document).ready(function() {




    if (jQuery('.add-ch').length) {
        jQuery('.add-ch').on('click touchstart', function (e) {
            e.preventDefault();
            ch_id = jQuery(this).data('chid');
            var t=jQuery(this);
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: '/ajax/add_to_loves/',
                        data: {
                            ch_id: ch_id
                        },
                        success: function (data) {
                            if(data['status'])
                            {

                               var html='<a href="#" class=" btn btn-sm  btn-disabled button-menu-manage pull-right"><span class="glyphicon glyphicon-thumbs-up"></span></a>';
                                var parent=t.parent()
                                parent.find('a').remove();
                                parent.append(html);
                                //alert('Succesfully added.');
                            }
                        }
                    });


        });
    }

    if (jQuery('.remove-ch').length) {
        jQuery('.remove-ch').on('click touchstart', function (e) {
            e.preventDefault();
            ch_id = jQuery(this).data('chid');
            var t=jQuery(this);
            $.ajax({
                type: "POST",
                dataType: "json",
                url: '/ajax/add_to_hates/',
                data: {
                    ch_id: ch_id
                },
                success: function (data) {
                    if(data['status'])
                    {

                        var html='<a href="#" class=" btn btn-sm  btn-disabled button-menu-manage pull-right"><span class="glyphicon glyphicon-thumbs-down"></span></a>';
                        var parent=t.parent()
                        parent.find('a').remove();
                        parent.append(html);
                        //alert('Succesfully added.');
                    }
                }
            });


        });
    }

});


function disable_buttons()
{
    if (jQuery('.btn-disabled').length) {
        jQuery('.btn-disabled').on('click touchstart', function (e) {
            e.preventDefault();
        });
    };
}

var options = {
    seriesBarDistance: 10,
    scaleMinSpace:1,
        axisX: {
        offset: 60
    },
    axisY: {
        offset: 80,
        onlyInteger: true,
        scaleMinSpace: 15
    }
};
var data1 = {
    labels: jQuery("#MostLovedCaract").data('labels'),
    series: [jQuery("#MostLovedCaract").data('values')]
};
var data2 = {
    labels: jQuery("#MostHatedCaract").data('labels'),
    series: [jQuery("#MostHatedCaract").data('values')]
};
var data3 = {
    labels: jQuery("#MostLovedProducts").data('labels'),
    series: [jQuery("#MostLovedProducts").data('values')]
};
var data4 = {
    labels: jQuery("#MostHatedProducts").data('labels'),
    series: [jQuery("#MostHatedProducts").data('values')]
};
var data5 = {
    labels: jQuery("#MostLovedOrganizations").data('labels'),
    series: [jQuery("#MostLovedOrganizations").data('values')]
};

var data6 = {
    labels: jQuery("#MostHatedOrganizations").data('labels'),
    series: [jQuery("#MostHatedOrganizations").data('values')]
};


var data7 = {
    labels: jQuery("#MostLovedCities").data('labels'),
    series: [jQuery("#MostLovedCities").data('values')]
};

var data8 = {
    labels: jQuery("#MostHatedCities").data('labels'),
    series: [jQuery("#MostHatedCities").data('values')]
};


var data9 = {
    labels: jQuery("#MostLovedEdible").data('labels'),
    series: [jQuery("#MostLovedEdible").data('values')]
};

var data10 = {
    labels: jQuery("#MostHatedEdible").data('labels'),
    series: [jQuery("#MostHatedEdible").data('values')]
};


var data11 = {
    labels: jQuery("#MostLovedChemicals").data('labels'),
    series: [jQuery("#MostLovedChemicals").data('values')]
};

var data12 = {
    labels: jQuery("#MostHatedChemicals").data('labels'),
    series: [jQuery("#MostHatedChemicals").data('values')]
};




if($('body').hasClass('stats')) {
    new Chartist.Bar('#MostLovedCaract', data1,options);
    new Chartist.Bar('#MostHatedCaract', data2,options);
    new Chartist.Bar('#MostLovedProducts', data3,options);
    new Chartist.Bar('#MostHatedProducts', data4,options);
    new Chartist.Bar('#MostLovedOrganizations', data5,options);
    new Chartist.Bar('#MostHatedOrganizations', data6,options);
    new Chartist.Bar('#MostLovedCities', data7,options);
    new Chartist.Bar('#MostHatedCities', data8,options);
    new Chartist.Bar('#MostLovedEdible', data9,options);
    new Chartist.Bar('#MostHatedEdible', data10,options);
    new Chartist.Bar('#MostLovedChemicals', data11,options);
    new Chartist.Bar('#MostHatedChemicals', data12,options);
}




$(document).ready(function () {

    $('.ch').selectize({
        valueField: 'ID',
        /*plugins: ['remove_button','restore_on_backspace'],*/
        plugins: ['remove_button'],
        labelField: 'NAME',
        searchField: 'NAME',
        delimiter: ';',
        persist: false,
        options: [],
        create: function (input) {
            return {
                NAME: input,
                ID: input
            }
        },
        render: {
            option: function (item, escape) {
                return '<div>' +
                    '<span class="title">' +
                    '<span class="name">' + escape(item.NAME) + '</span>' +
                    '</span>' +
                    '</div>';
            }
        },
        load: function (query, callback) {
            var category_id = this.$input.data('category_id');
            if(!category_id)return callback();
            if (!query.length > 3) return callback();
            $.ajax({
                url: '/ajax/get_ch/?category_id='+category_id+'&query=' + encodeURIComponent(query),
                type: 'GET',
                dataType: "json",
                error: function () {
                    callback();
                },
                success: function (res) {
                    callback(res.slice(0, 40));
                }
            });
        }
    });

    $('.full_ch').selectize({
        valueField: 'ID',
        /*plugins: ['remove_button','restore_on_backspace'],*/
        plugins: ['remove_button'],
        labelField: 'NAME',
        searchField: 'NAME',
        delimiter: ';',
        persist: false,
        options: [],
        create: false,
        render: {
            option: function (item, escape) {
                return '<div>' +
                    '<span class="title">' +
                    '<span class="name">' + escape(item.NAME) + '</span>' +
                    '</span>' +
                    '</div>';
            }
        },
        load: function (query, callback) {
            if (!query.length > 3) return callback();
            $.ajax({
                url: '/ajax/get_ch/?query=' + encodeURIComponent(query),
                type: 'GET',
                dataType: "json",
                error: function () {
                    callback();
                },
                success: function (res) {
                    callback(res.slice(0, 40));
                }
            });
        }
    });





});