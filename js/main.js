$(window).load(function(){
	$(".util-pie").fadeOut("slow");
});
$(document).ready(function(){
	$("#loginForm").formValidation({
		//only for bootstrap form
		framework: 'bootstrap',

		//Icons that will shown

		icon:
		{
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'

		},

		fields:
		{
			username:
			{
				validators:
				{
					notEmpty:
					{
						message: 'The username is required and connot be empty'
					},
					stringLength:
					{
						min: 5,
						max: 30,
						message: 'The username must be more than 5 and less than 30 characters long'
					}
				}
			},
			password:
			{
				validators:
				{
					notEmpty:
					{
						message: 'The password is required and connot be empty'
					}
				}
			}
		}//filds
	});
});