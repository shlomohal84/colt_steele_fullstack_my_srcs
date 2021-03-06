const mongoose = require('mongoose');
const Campground = require('../models/campground')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
mongoose.connect('mongodb://127.0.0.1:27017/yelpCamp', {
	// useNewUrlParser: true,
	// useCreateIndex: true,
	// useUnifiedToplogy: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:\n'));
db.once('open', () => {
	console.log("Database connected")
})

const sample = arr => arr[Math.floor(Math.random() * arr.length)]

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 50; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const camp = new Campground({
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`
		})
		await camp.save()
	}
	// const c = new Campground({title:'purple field'});
	// await c.save();
}

seedDB().then(() => {
	db.close();
})