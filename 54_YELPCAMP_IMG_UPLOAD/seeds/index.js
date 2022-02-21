const mongoose = require('mongoose');
const User = require('../models/user');
const Campground = require('../models/campground');
const Review = require('../models/review');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const lorem = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero, eaque facilis a perferendis laboriosam odio. Itaque pariatur labore eum perspiciatis dolorem quae minima nesciunt velit dolor. Dolor dignissimos eos dolorem!"
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
	await Review.deleteMany({});
	for (let i = 0; i < 50; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10
		const camp = new Campground({
			author: "61b38b8551c06d3740b3b375",
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			images: [
				{
					url: 'https://res.cloudinary.com/snackeater/image/upload/v1639239472/YelpCamp/ize5bggkwzmo0xqw1pz8.jpg',
					filename: 'YelpCamp/ize5bggkwzmo0xqw1pz8',
				},
				{
					url: 'https://res.cloudinary.com/snackeater/image/upload/v1639239472/YelpCamp/blwc97lor1d8tinp74wp.jpg',
					filename: 'YelpCamp/blwc97lor1d8tinp74wp',
				}
			],
			description: lorem,
			price,
		})
		await camp.save()
	}
	// const c = new Campground({title:'purple field'});
	// await c.save();
}

seedDB().then(() => {
	db.close();
})