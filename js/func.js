$(document).ready(function() {
	
	// get navigation / banner and footer content
	// nav & banner
	var banner = $('#banner');
	
	// When the user scrolls the page, execute myFunction 
	window.onscroll = function() {myFunction()};
	var navContainer = document.getElementById("navContainer");
	
	// Get the offset position of the navbar
	var sticky = navContainer.offsetTop;
	
	// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
} 
	$.get('../html/banner.html', function(content) {
		
		// put banner file into web page
		banner.html(content);
		
		// function navClick()
		var bars = $('#bars');
		bars.click(function() {
			// navigation functionality
			
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
		})

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

		// get path to set 'active' nav
		var path = document.location.pathname;
		console.log(path);
		switch(path) {
			case '/':
				nav.children[0].classList.add('active');
				break;
			
			case '/about':
				nav.children[1].classList.add('active');
				break;

			case '/services':
			case '/services/hypnosis':
			case '/services/health':
			case '/services/quantum':
			case '/services/energy':
				nav.children[2].classList.add('active');
				break;
			
			// [3] is subNav

			case '/events':
				nav.children[4].classList.add('active');
				break;
			
			case '/schedule':
				nav.children[5].classList.add('active');
				break;
			
			case '/contact':
				nav.children[6].classList.add('active');
				break;
			
			case '/login':
				nav.children[7].classList.add('active');
				break;
		}
		
		//determine whether logged in or out
		$.post('/getstate', function(res, status)
		{
			//get username and logged in status
			userInfo.username = res.username;
			userInfo.loggedin = res.loggedin;
			
			console.log(userInfo.username);
			console.log(userInfo.loggedin);
			
			console.log($("#logoutbutton").text());
			console.log($("#loginbutton").text());
			
			//turn log in to log out if logged in
			if(userInfo.loggedin)
			{
				$("#loginbutton").hide();
				$("#logoutbutton").show();
				$("#loggedin").text("Hello, " + userInfo.username);
				$("#loggedin").show();
			}
			else
			{
				$("#logoutbutton").hide();
				$("#loginbutton").show();
				$("#loggedin").hide();
			}
		}).fail(function()
		{
			alert("Something went wrong??");
		});
	})

	// footer
	var footer = $('#footer');
	$.get('../html/footer.html', function(content) {
		// put footer file into web page
		footer.html(content);
	})
})


let userInfo =
{
	username: "",
	loggedin: false
}

function logout()
{
	$.post("/logout", function (res, status) {
	  window.location.replace('/login');
     }).fail(function () {
          alert("Something went wrong??");
     })
}


window.addEventListener("load", function load(event){

},false);
