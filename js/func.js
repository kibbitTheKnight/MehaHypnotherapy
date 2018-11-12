$(document).ready(function() {
	
	// get navigation / banner and footer content
	// nav & banner
	var banner = $('#banner');
	
	
	$.get('../html/banner.html', function(content) {
		
		// put banner file into web page
		banner.html(content);
		
		var $bars = $('#bars');
		$bars.click(function() {
			navClick();
		});


			/*tried to make sticky header but didnt work lol 
			// When the user scrolls the page, execute myFunction 
	window.onscroll = function() {myFunction()};

	
	// Get the offset position of the navbar
	var sticky = navContainer.offsetTop;
	
	// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    navContainer.classList.remove("sticky");
  }
} 
*/
			

		// get coordinates for "Services" nav element and set postion of "subNav"
		setComponents();

		// get path to set 'active' nav
		var nav = document.getElementById('nav');
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

var $navContainer = $('#navContainer');
var $nav = $('#nav');

window.onresize = function() {
	setComponents();
};

function setComponents() {
	// set / reset elements on window resize
	var desktop;
	var grids;
	var winSize = $(window).width();
	console.log(winSize);

	$navContainer = $('#navContainer');
	$nav = $('#nav');
	$bars = $('#bars');
	
	// set subNav
	var rect = nav.children[2].getBoundingClientRect();
	var subNav = document.getElementById("subNav");
	subNav.style.left = rect.left + "px";
	subNav.style.top = (rect.height + rect.top) + "px";

	// desktop or nah?
	if (winSize >= 1024)
		desktop = true;
	else {
		desktop = false;
	}

	if (desktop) {
		// set desktop properties
		$nav.css('display', 'block');
		$navContainer.css('height', 'auto');
		$bars.css('display', 'none');
	
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

		// change grid / column size
		grids = $('.col-6');
		grids.attr('class', 'col-3');
	}
	else {
		// set mobile / tablet properties
		$nav.css('display', 'none');
		$navContainer.css('height', '50px');
		$bars.css('display', 'block');

		// change grid / column size
		grids = $('.col-3');
		grids.attr('class', 'col-6');
	}


}

function navClick() {
	// navigation functionality
	
	$navContainer = $('#navContainer');
	$nav = $('#nav');
	
	// show / hide the nav menu when the dashes / X is clicked on
	$navContainer.toggleClass("change");
			
	// nav container dropdown
	if ($nav.css('display') == "block") {
		// hide navbar
		$nav.css('display', 'none');
		$navContainer.css('height', '50px');
	}
	else {
		// show navbar
		$nav.css('display', 'block');
		$navContainer.css('height', 'auto');
	}

}