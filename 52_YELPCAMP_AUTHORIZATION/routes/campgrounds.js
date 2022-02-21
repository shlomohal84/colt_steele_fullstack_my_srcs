const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { validateCampground, isLoggedIn, isAuthor } = require('../middleware')
const Campground = require('../models/campground');





router.get('/', catchAsync(async (req, res, next) => {
	const campgrounds = await Campground.find({})
	res.render('campgrounds/index', { campgrounds })
}));

router.get('/new', isLoggedIn, (req, res) => {
	res.render('campgrounds/new');
});

router.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res, next) => {
	const campground = new Campground(req.body.campground);
	campground.author = req.user._id;
	await campground.save()
	req.flash('success', 'Successfully created a new campground!')
	res.redirect(`/campgrounds/${campground._id}`)
}))

router.get('/:id', catchAsync(async (req, res, next) => {
	const campground = await Campground.findById(req.params.id).populate({
		path: 'reviews',
		populate: {
			path: 'author'
		}
	}).populate('author')
	if (!campground) {
		req.flash('error', 'Campground not found!');
		return res.redirect('/campgrounds')
	}
	res.render('campgrounds/show', { campground, msg: req.flash() })
}));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res, next) => {
	const { id } = req.params
	const campground = await Campground.findById(id)
	if (!campground) {
		req.flash('error', 'Campground not found!');
		return res.redirect('/campgrounds')
	}
	res.render(`campgrounds/edit`, { campground })
}))

router.put('/:id', isLoggedIn, validateCampground, isAuthor, catchAsync(async (req, res, next) => {
	const { id } = req.params
	const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground }, { new: true });
	req.flash('success', 'Successfully updated campground!!')
	res.redirect(`/campgrounds/${campground._id}`)
}))

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res, next) => {
	const { id } = req.params
	const campground = await Campground.findByIdAndDelete(id);

	if (!campground.author.equals(req.user._id)) {
		req.flash('error', 'You do not have permission to do that!');
		return res.redirect(`/campgrounds/${id}`)
	}
	req.flash('success', 'Successfully deleted campground!!')
	res.redirect(`/campgrounds`)
}))

module.exports = router;