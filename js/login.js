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
          displayErr();
     })

//   **** If login successfull do this....  ****
     if(status == 200)
     {
		
     }
}

function clearText(elementId)
{
     document.getElementById(elementId).value = '';
}

function createAccount()
{
     //   Initialize url.
     var url_signup = 'https://mehahypnotherapy.herokuapp.com/createAccount';
	 console.log("I'm here!");
     //   Initialize userdata
     let userdata = {
          email: $('#email').val(),
          username: $('#user').val(),
		  password: $('#pass').val(),
		  repassword: $('#repass').val()
     }

	 if(userdata.password != userdata.repassword)
	 {
		 alert("signup failed");
		 clearText('repass');
		 clearText('pass');
	 }
	 
     $.post("/createAccount", userdata, function (res, status) {
          console.log(status);
     }).fail(function() {
          alert("signup failed");
     });

     //   Clear all text fields.
     clearText('user');
     clearText('pass');
     clearText('repass');
     clearText('email');
}