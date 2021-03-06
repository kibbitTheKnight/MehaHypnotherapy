const bcrypt = require("bcrypt");
const path = require('path');
const bodyparser = require('body-parser');
const express = require('express');
const Session = require('express-session');
const cookieParser = require('cookie-parser');
const csprng = require('csprng');

const {
	Client
} = require('pg');

const client = new Client({
		connectionString: process.env.DATABASE_URL,
		ssl: true,
	});

var request = require('request').defaults({
		encoding: null
	});

const saltRounds = 10;

function checkInput(inputobj) {
	let prohibitedChars = ['\"', '\'', ';']
	for (let key in inputobj) {
		for (let char in prohibitedChars) {
			if ((inputobj[key]).indexOf(prohibitedChars[char]) > -1) {
				console.log("invalid char of: " + inputobj[key] + " char: " + prohibitedChars[char]);
				return true;
			}
		}
	}
	return false;
}

const app = express(); // main app object

const port = process.env.PORT || 8080; // uses server env port if exists, else uses default 8080
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
		extended: true
	}))
app.use(cookieParser());

app.use(Session({
		secret: csprng(256, 36)
	}));
app.enable('trust proxy');
/*
app.use(function (req, res, next) {
	if (req.secure) {
		// request was via https, so do no special handling
		next();
	} else {
		// request was via http, so redirect to https
		res.redirect('https://' + req.headers.host + req.url);
	}
});
/*
app.use(function (req, res, next) {
	console.log(req.session.userid);
	if (checkInput(req.body)) {
		res.status(400).send();
	} else {
		next();
	}
});
*/

app.use('/img', express.static('img/'));
app.use('/html', express.static('html/'));
app.use('/css', express.static('css/'));
app.use('/js', express.static('js/'));

// routes
client.connect(); // connect to db
// for homepage get requests
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/html/index.html');
});

app.get('/index', function (req, res) {
	console.log("I was called");
	if (req.session.loggedin) {
		console.log(req.session.loggedin);
		console.log("Serving index.html");
		return res.status(200).sendFile(__dirname + '/public/html/index.html');
	} else {
		res.redirect("/");
	}
});

app.get('/about', function (req, res) {
        res.sendFile(__dirname + '/html/about.html');
});
app.get('/services', function (req, res) {
        res.sendFile(__dirname + '/html/services.html');
});
app.get('/products', function (req, res) {
        res.sendFile(__dirname + '/html/products.html');
});
app.get('/events', function (req, res) {
        res.sendFile(__dirname + '/html/events.html');
});
app.get('/contact', function (req, res) {
        res.sendFile(__dirname + '/html/contact.html');
});
app.get('/schedule', function (req, res) {
        res.sendFile(__dirname + '/html/schedule.html');
});
app.get('/', function (req, res) {
        res.sendFile(__dirname + '/html/index.html');
});
app.get('/login', function (req, res) {
        res.sendFile(__dirname + '/html/login.html');
});
app.get('/createAccount', function (req, res) {
        res.sendFile(__dirname + '/html/createAccount.html');
});
app.get('/dashboard', function (req, res) {
	//only redirect to dashboard if logged in
	console.log(req.session.loggedin);
	if(req.session.loggedin)
	{
        res.sendFile(__dirname + '/html/dashboard.html');
	}
	else
	{
		res.redirect("/login");
	}
});
app.get('/services/hypnosis', function (req, res) {
        res.sendFile(__dirname + '/html/services/hypnosis.html');
});
app.get('/services/health', function (req, res) {
        res.sendFile(__dirname + '/html/services/health.html');
});
app.get('/services/quantum', function (req, res) {
        res.sendFile(__dirname + '/html/services/quantum.html');
});
app.get('/services/energy', function (req, res) {
        res.sendFile(__dirname + '/html/services/energy.html');
});

app.get('/login', function (req, res) {
	if (req.session.loggedin != true) {
		console.log("Serving login.html");
		res.sendFile(__dirname + '/html/login.html');
	} else {
		res.redirect("/");
	}
});

app.post('/logout', function(req, res)
{
	req.session.loggedin = false;
	req.session.username = "";
	res.redirect("/login");
});

app.post('/getstate', function(req, res)
{
	res.send(req.session);
});

app.post('/login', function (req, response) 
{
	//var loginLink = $("#loginbutton");
	console.log("receiving login info:");
	if (req.body.username > 30 ||
		checkInput(req.body)) 
	{
		console.log("1");
		response.status(400).send();
	} 
	else 
	{
		 let query = 'SELECT * FROM users WHERE username=\'' + req.body.username +'\';';
		 client.query(query, (err, res) => 
		{
			if (!err)
			{
				if (res.rowCount == 1) 
				{
					bcrypt.compare(req.body.password, res.rows[0].password, (err2, same) => 
					{
						if (!err2)
						{
							console.log("password compare: " + same);
							if (same) 
							{
								req.session.loggedin = true;
								req.session.username = res.rows[0].username;
								console.log("redirecting to home");
								response.set('Access-Control-Allow-Origin','*');
								response.status(200).send(req.session);
								return;
							} 
							else 
							{
								response.status(401).send();
							}
						} 
						else 
						{
							console.log(err2);
						}
					});
				} else {
					response.status(401).send();
				}
			} 
			else
			{
				console.log(err);
			}
		});
	}
});

/*
app.get('/logout', function (req, res) {
	req.session.loggedin = false;
	req.session.id = undefined;
	res.redirect("/login");
})
*/
app.post('/createAccount', function (req, res) {
	var nameTaken = false;
	console.log("receiving signup info:");
	let query = 'SELECT * FROM users WHERE username=\'' + req.body.username +'\';';
		 client.query(query, (err, res2) => 
		{
			if(!err)
			{
				if(res2.rowCount > 0)
				{
					nameTaken = true;
					res.status(401).send("username");
					res.end();
				}
			}
		});
	if(nameTaken)
	{
		return;
	}
	if (checkInput(req.body)) {
		res.status(400).send();
	} else {
		let userdata = req.body;
		let hash = bcrypt.hashSync(userdata.password, saltRounds);
		let query = "INSERT INTO users (username, password, email) VALUES (\'" + userdata.username + "\', \'" + hash + "\', \'" + userdata.email + "\');";
		client.query(query, (err, res2) => {
			if (err) {
				console.log(err.stack);
		 	}
		});
		res.status(200).send();
	}
});

// dumps user table if logged in
app.get('/db', function (req, res) {
	console.log("showing DB results");
	client.query('SELECT * FROM users', (err, res2) => {
		var dbresult = "";
		if (err)
			throw err;
		console.log(res2);
		for (let row of res2.rows) {
			dbresult += JSON.stringify(row) + "\n";
		}
		console.log(dbresult);
		res.send(dbresult);
	});
});

// start app on port
app.listen(port, () => console.log("active on port: " + port));

// Handle 404
app.use(function(req, res, next) {
    res.status(404);
    res.send('404: File Not Found');
});