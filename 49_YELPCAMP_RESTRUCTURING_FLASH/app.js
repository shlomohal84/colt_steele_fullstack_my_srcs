const port = 3000;
const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session')
const flash = require('connect-flash')
const ExpressError = require('./utils/ExpressError')
const methodOverride = require('method-override')

const campgrounds = require('./routes/campgrounds')
const reviews = require('./routes/reviews')

mongoose.connect('mongodb://127.0.0.1:27017/yelpCamp', {});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:\n'));
db.once('open', () => {
	console.log("Database connected");
});
const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))

//session
const sessionConfig = {
	secret: 'thisshouldbeabettersecret!',
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		expires: Date.now() + (1000 * 60 * 60 * 24 * 7),
		maxAge: 1000 * 60 * 60 * 24 * 7
	}
}
app.use(session(sessionConfig))
app.use(flash())
app.use((req, res, next) => {
	res.locals.success = req.flash('success')
	res.locals.error = req.flash('error')
	next()
})

app.use('/campgrounds', campgrounds)
app.use('/campgrounds/:id/reviews', reviews)

app.get('/', (req, res) => {
	res.render('home')
	// res.redirect('/campgrounds')
});


app.all('*', (req, res, next) => {
	next(new ExpressError('Page not found!', 404))
})
app.use((err, req, res, next) => {
	const { message = 'something went wrong!', statusCode = 500 } = err
	if (!err.message) err.message = 'Oh No, something went wrong!'
	res.status(statusCode).render('Error', { err })
	// res.send('Oh Boy, something went wrong!')
})

//
app.listen(port, () => console.log(`Serving on port ${port}`))
//