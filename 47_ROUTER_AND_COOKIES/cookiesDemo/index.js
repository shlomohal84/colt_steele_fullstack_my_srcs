const port = 3000;
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser('thisismysecret'));

app.get('/greet', (req, res) => {
	const { name = 'Anonymous'} = req.cookies;
	res.send(`HEY THERE ${name.toUpperCase()}!`)
})

app.get('/setname', (req, res) => {
	res.cookie('name', 'Chickenshit');
	res.cookie('animal', 'Doge');
	res.send('OK, SENT YOU A COOKIE')
});

app.get('/getsignedcookie', (req, res) => {
	res.cookie('fruit', 'grape', { signed: true })
	res.send('OK SIGNED YOUR FRUIT COOKIE!')
});

app.get('/verifyfruit', (req, res) => {
	console.log(req.cookies);
	console.log(req.signedCookies);
	res.send(req.signedCookies)
})

app.listen(port, console.log(`Listening on port ${port}`));

