const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const Campground = require('./models/campground')
const port = 3001;

mongoose.connect('mongodb://127.0.0.1:27017/yelpCamp', {});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:\n'));
db.once('open', () => {
	console.log("Database connected");
});
const app = express();

//
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
//

//
app.get('/', (req, res) => {
	// res.send('HELLO FROM YELP CAMP!')
	res.render('home')
});

app.get('/campgrounds', async (req, res) => {
	const campgrounds = await Campground.find({})
	res.render('campgrounds/index', { campgrounds })
});
app.get('/campgrounds/new', (req, res) => {
	res.render('campgrounds/new');
});

app.post('/campgrounds', async (req, res) => {
	const campground = new Campground(req.body.campground);
	await campground.save()
	res.redirect(`/campgrounds/${campground._id}`)
})

app.get('/campgrounds/:id', async (req, res) => {
	const campground = await Campground.findById(req.params.id)
	res.render('campgrounds/show', { campground })
});

app.get('/campgrounds/:id/edit', async (req, res) => {
	const { id } = req.params
	const campground = await Campground.findById(id)
	res.render(`campgrounds/edit`, { campground })
})

app.put('/campgrounds/:id', async (req, res) => {
	const { id } = req.params
	const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground },{new:true});
	console.log(`Updated to: ${campground.title} - ${campground.location}`)
	res.redirect(`/campgrounds/${campground._id}`)

})
app.delete('/campgrounds/:id', async (req, res) => {
	const { id } = req.params
	const deletedProduct = await Campground.findByIdAndDelete(id);
	console.log(`Deleted: ${deletedProduct.title} - ${deletedProduct.location}`)
	res.redirect(`/campgrounds`)

})
//

//
app.listen(port, () => console.log(`Serving on port ${port}`))
//