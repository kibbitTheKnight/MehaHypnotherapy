// navigation functionality
document.getElementById("bars").onclick = function() {

	// show / hide the nav menu when the dashes / X is clicked on
	var navContainer = document.getElementById("navContainer");
	navContainer.classList.toggle("change");
	
	// nav container dropdown
	var nav = document.getElementById("nav");
	if (nav.style.display == "block") {
		// hide navbar
		nav.style.display = "none";
		navContainer.style.backgroundColor = "transparent";
	}
	else {
		// show navbar
		nav.style.display = "block";
		navContainer.style.backgroundColor = "#FCFBE3";
	}

	// get coordinates for "Services" nav element and set postion of "subNav"
	var rect = nav.children[2].getBoundingClientRect();
	var subNav = document.getElementById("subNav");
	subNav.style.left = rect.left + "px";
	subNav.style.top = (rect.height + rect.top) + "px";

	// services dropdown (both for services and the subNav)
	nav.children[2].onmouseenter = function() {
		document.getElementById("subNav").style.display = "block";
	}
	nav.children[2].onmouseleave = function() {
		document.getElementById("subNav").style.display = "none";
	}
	subNav.onmouseenter = function() {
		document.getElementById("subNav").style.display = "block";
	}
	subNav.onmouseleave = function() {
		document.getElementById("subNav").style.display = "none";
	} 
}

let userInfo =
{
	username: "",
	loggedin: false
}

window.addEventListener("load", function load(event){
	
	$.post('/getstate', function(res, status)
	{
		//get username and logged in status
		userInfo.username = res.username;
		userInfo.loggedin = res.loggedin;
		
		//turn log in to log out if logged in
		if(userInfo.loggedin)
		{
			$("#loginbutton").text("Log out");
		}
	}).fail(function()
	{
		alert("Something went wrong??");
	});
},false);