let port = 3000
const express = require('express');
const app = express();
const session = require('express-session');

const sessionOptions = { secret: 'thisisnotagoodsecret', resave: false, saveUninitialized: false }
app.use(session(sessionOptions))

app.get('/viewcount', (req, res) => {
	if (req.session.count) {
		req.session.count += 1
	} else {
		req.session.count = 1
	}
	res.send(`You have viewed this page ${req.session.count} times`)
})

app.get('/register', (req, res) => {
	const { username = 'Anonymous' } = req.query;
	req.session.username = username;
	res.redirect('/greet')
})

app.get('/greet', (req, res) => {
	const {username} = req.session
	res.send(`Welcome Back ${username}!`)
})

app.get('/', (req, res) => {
	res.send('root')
})

app.listen(port, console.log(`LISTENING ON PORT ${port}`))