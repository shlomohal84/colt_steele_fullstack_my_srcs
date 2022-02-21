const express = require('express');
const app = express();
const path = require('path');
let port = 8080;
const mongoose = require('mongoose');
const methodOverride = require('method-override')

const Product = require('./models/product')

mongoose.connect('mongodb://localhost:27017/farmStand',
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

app.get('/products', async (req, res) => {
	const { category } = req.query
	if (category) {
		const products = await Product.find({ category })
		res.render('products/index', { products, category })
	} else {
		const products = await Product.find({})
		res.render('products/index', { products,category: 'All' })
	}
})

app.get('/products/new', (req, res) => {
	res.render('products/new',{categories})
})

app.post('/products', async (req, res) => {
	const newProduct = new Product(req.body)
	await newProduct.save()
	console.log(`Added: ${newProduct.name}`)
	res.redirect(`/products/${newProduct._id}`)

})

app.get('/products/:id', async (req, res) => {
	const { id } = req.params;
	const product = await Product.findById(id)
	res.render('products/show', { product })
})

app.get('/products/:id/edit', async (req, res) => {
	const { id } = req.params;
	const product = await Product.findById(id)
	res.render(`products/edit`, { product, categories })
})

app.put('/products/:id', async (req, res) => {
	const { id } = req.params;
	const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
	console.log(`Edited: ${product.name}`)
	res.redirect(`/products/${product._id}`)
})

app.delete('/products/:id', async (req, res) => {
	const { id } = req.params;
	const deletedProduct = await Product.findByIdAndDelete(id)
	console.log(`Deleted: ${deletedProduct.name}`)
	res.redirect(`/products`)

})

app.listen(port, () => console.log(`APP IS LISTENING ON PORT ${port}`))
// const mongoose = require('mongoose');

