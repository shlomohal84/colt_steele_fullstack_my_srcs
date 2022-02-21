const express = require('express');
const app = express();
const path = require('path');
let port = 8080;
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const AppError = require('./AppError')

const Product = require('./models/product')

mongoose.connect('mongodb://localhost:27017/farmStand2',
	{ useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('DB CONNECTION IS OPEN!!')
	})
	.catch(err => {
		console.log('ERROR!@!#@!$E!')
		console.log(err)
	})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

const categories = ['fruit', 'vegetable', 'dairy']

function wrapAsync(fn) {
	return function (req, res, next) {
		fn(req, res, next).catch(err => next(err))
	}
}

app.get('/products', wrapAsync(async (req, res, next) => {
	const { category } = req.query
	if (category) {
		const products = await Product.find({ category })
		res.render('products/index', { products, category })
	} else {
		const products = await Product.find({})
		res.render('products/index', { products, category: 'All' })
	}
}));

app.get('/products/new', (req, res) => {
	// throw new AppError('NOT ALLOWED', 401)
	res.render('products/new', { categories })
})

app.post('/products', wrapAsync(async (req, res, next) => {
	const newProduct = new Product(req.body)
	await newProduct.save()
	console.log(`Added: ${newProduct.name}`)
	res.redirect(`/products/${newProduct._id}`)
}))

app.get('/products/:id', wrapAsync(async (req, res, next) => {
	const { id } = req.params;
	const product = await Product.findById(id)
	if (!product) {
		throw new AppError('Product not found', 404)
	}
		res.render('products/show', { product })
}))

app.get('/products/:id/edit', wrapAsync(async (req, res, next) => {
	const { id } = req.params;
	const product = await Product.findById(id)
	if (!product) {
		throw new AppError('Product not found', 404)
	}
	res.render(`products/edit`, { product, categories })
}))

app.put('/products/:id', wrapAsync(async (req, res, next) => {
	const { id } = req.params;
	const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
	console.log(`Edited: ${product.name}`)
	res.redirect(`/products/${product._id}`)
}))

app.delete('/products/:id', wrapAsync(async (req, res, next) => {
	const { id } = req.params;
	const deletedProduct = await Product.findByIdAndDelete(id)
	console.log(`Deleted: ${deletedProduct.name}`)
	res.redirect(`/products`)
}))

const handleValidationErr = err => {
	console.dir(err);
	return new AppError(`Validation Failed... ${err.message}`,400)
}

app.use((err, req, res, next) => {
	console.log(err.name);
	if (err.name === 'ValidationError') err = handleValidationErr(err);
	next(err)
})

app.use((err, req, res, next) => {
	const { status = 500, message = 'Something went wrong' } = err;
	res.status(status).send(message)
})

app.listen(port, () => console.log(`APP IS LISTENING ON PORT ${port}`))
// const mongoose = require('mongoose');
