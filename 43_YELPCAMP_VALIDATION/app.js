const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const { campgroundSchema } = require('./schemas')
const catchAsync = require('./utils/catchAsync')
const ExpressError = require('./utils/ExpressError')
const methodOverride = require('method-override')
const Campground = require('./models/campground')
const port = 3000;

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

const validateCampground = (req, res, next) => {
	const { error } = campgroundSchema.validate(req.body)
	if (error) {
		const msg = error.details.map(elm => elm.message).join(',')
		throw new ExpressError(msg, 400)
	} else {
			next()
	}
}

app.get('/', (req, res) => {
	// res.send('HELLO FROM YELP CAMP!')
	res.render('home')
});

app.get('/campgrounds', catchAsync(async (req, res, next) => {
	const campgrounds = await Campground.find({})
	res.render('campgrounds/index', { campgrounds })
}));

app.get('/campgrounds/new', (req, res) => {
	res.render('campgrounds/new');
});

app.post('/campgrounds', validateCampground, catchAsync(async (req, res, next) => {
	const campground = new Campground(req.body.campground);
	console.log(req.body.campground)
	await campground.save()
	res.redirect(`/campgrounds/${campground._id}`)
}))

app.get('/campgrounds/:id', catchAsync(async (req, res, next) => {
	const campground = await Campground.findById(req.params.id)
	res.render('campgrounds/show', { campground })
}));

app.get('/campgrounds/:id/edit', catchAsync(async (req, res, next) => {
	const { id } = req.params
	const campground = await Campground.findById(id)
	res.render(`campgrounds/edit`, { campground })
}))

app.put('/campgrounds/:id', validateCampground, catchAsync(async (req, res, next) => {
	const { id } = req.params
	const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground }, { new: true });
	console.log(`Updated to: ${campground.title} - ${campground.location}`)
	console.log(req.params)
	res.redirect(`/campgrounds/${campground._id}`)
}))

app.delete('/campgrounds/:id', catchAsync(async (req, res, next) => {
	const { id } = req.params
	const deletedProduct = await Campground.findByIdAndDelete(id);
	console.log(`Deleted: ${deletedProduct.title} - ${deletedProduct.location}`)
	res.redirect(`/campgrounds`)
}))
//

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