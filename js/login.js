const urlBase = 'https://mehahypnotherapy.herokuapp.com'

function login()
{
     var url_login = 'https://mehahypnotherapy.herokuapp.com/login';
     var user = $('#user-login').val();

     let userdata = {
		  email: $('#user-email').val(),
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