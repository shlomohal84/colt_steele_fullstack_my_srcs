const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { campgroundSchema } = require('../schemas');

const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');

const validateCampground = (req, res, next) => {
	const { error } = campgroundSchema.validate(req.body)
	if (error) {
		const msg = error.details.map(elm => elm.message).join(',')
		throw new ExpressError(msg, 400)
	} else {
		next()
	}
}

router.get('/', catchAsync(async (req, res, next) => {
	const campgrounds = await Campground.find({})
	res.render('campgrounds/index', { campgrounds })
}));

router.get('/new', (req, res) => {
	res.render('campgrounds/new');
});

router.post('/', validateCampground, catchAsync(async (req, res, next) => {
	const campground = new Campground(req.body.campground);
	console.log(req.body.campground)
	await campground.save()
	req.flash('success', 'Successfully created a new campground!')
	res.redirect(`/campgrounds/${campground._id}`)
}))

router.get('/:id', catchAsync(async (req, res, next) => {
	const campground = await Campground.findById(req.params.id).populate('reviews');
	if (!campground) {
		req.flash('error', 'Campground not found!');
		return res.redirect('/campgrounds')
	}
	res.render('campgrounds/show', { campground, msg: req.flash() })
}));

router.get('/:id/edit', catchAsync(async (req, res, next) => {
	const { id } = req.params
	const campground = await Campground.findById(id)
	if (!campground) {
		req.flash('error', 'Campground not found!');
		return res.redirect('/campgrounds')
	}
	res.render(`campgrounds/edit`, { campground })
}))

router.put('/:id', validateCampground, catchAsync(async (req, res, next) => {
	const { id } = req.params
	const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground }, { new: true });
	console.log(`Updated to: ${campground.title} - ${campground.location}`)
	console.log(req.params)
	req.flash('success', 'Successfully updated campground!!')
	res.redirect(`/campgrounds/${campground._id}`)
}))

router.delete('/:id', catchAsync(async (req, res, next) => {
	const { id } = req.params
	const deletedProduct = await Campground.findByIdAndDelete(id);
	console.log(`Deleted: ${deletedProduct.title} - ${deletedProduct.location}`)
	req.flash('success', 'Successfully deleted campground!!')
	res.redirect(`/campgrounds`)
}))

module.exports = router;