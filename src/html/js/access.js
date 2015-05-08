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

