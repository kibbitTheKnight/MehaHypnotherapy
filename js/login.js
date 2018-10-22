const urlBase = 'https://mehahypnotherapy.herokuapp.com'

function login()
{
     var url_login = 'https://mehahypnotherapy.herokuapp.com/login';
     var user = $('#user-login').val();

     let userdata = {
          username: $('#user-login').val(),
          password: $('#password-login').val()
     }

     if (userdata.username == "" || userdata.password == "") {
          displayErr();
          return
     }

     console.log(JSON.stringify(userdata));
     $.post(url_login, userdata, function (res, status) {
		//id = res;
	  window.location.replace('/');
     }).fail(function () {
          alert("login failed");
     })
//   **** If login successfull do this....  ****
     if(status == 200)
     {
		console.log("logged in");
     }
	 else
	 {
		alert("username or password is incorrect");
		window.location.replace('/login');
	 }
}

function createAccount()
{
     //   Initialize url.
     var url_signup = 'https://mehahypnotherapy.herokuapp.com/createAccount';
	 
	 console.log($('#pass').val());
	 if($('#pass').val() != $('#repass').val())
	 {
		 alert("signup failed, passwords did not match");
		 return;
	 }
	 
     //   Initialize userdata
     let userdata = {
          email: $('#email').val(),
          username: $('#user').val(),
		  password: $('#pass').val(),
		  repassword: $('#repass').val()
     }
	 
     $.post("/createAccount", userdata, function (res, status) {
          console.log(status);
     }).fail(function() {
          alert("signup failed");
     });
	 window.location.href="https://mehahypnotherapy.herokuapp.com/login"
}
