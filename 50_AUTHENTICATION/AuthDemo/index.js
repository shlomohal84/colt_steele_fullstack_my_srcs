const express = require('express');
const app = express();
const port = 3000;
const User = require('./models/user')
const ejs = require('ejs')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');

mongoose.connect('mongodb://127.0.0.1:27017/authDemo')
	.then(() => {
		console.log('Mongoose connected to database!')
	})
	.catch(err => {
		console.log('Database connection error!');
		console.log(err);

	})
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: 'notagoodsecret', resave: false, saveUninitialized: false }))

const requireLogin = (req, res, next) => {
	if (!req.session.user_id) {
		return res.redirect('/login')
	}
	next()
}


app.get('/', (req, res) => {
	res.send('Homepage!')
});
app.get('/register', (req, res) => {
	res.render('register')
});

app.post('/register', async (req, res) => {
	const { username, password } = req.body
	const user = new User({username,password});
	await user.save();
	req.session.user_id = user._id;
	res.redirect('/login')
})

app.get('/login', (req, res) => {
	res.render('login')
})
app.post('/login', async (req, res) => {
	const { username, password } = req.body
	const foundUser = await User.findAndValidate(username, password);
	if (foundUser) {
		req.session.user_id = foundUser._id;
		res.redirect('/secret')
	} else {
		res.redirect('/login')
	}
})

app.get('/secret', requireLogin, (req, res) => {
	res.render('secret')
});

app.post('/logout', (req, res) => {
	req.session.user_id = null;
	req.session.destroy()
	res.redirect('/login')
})

app.get('/topsecret', requireLogin, (req, res) => {
	res.send('TOP SECRET!!!')
})

app.listen(port, console.log(`ExpressJS server listening on port ${port}!`))
