const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopApp')
	.then(() => console.log('CONNECTION OPEN!'))
	.catch(err => console.log(err))

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		maxlength: 20
	},
	price: {
		type: Number,
		required: true,
		min: [0, 'Price Must Be Positive!']
	},
	isOnSale: {
		type: Boolean,
		default: false,
	},
	categories: [String],
	qty: {
		online: {
			type: Number,
			default: 0
		},
		inStore: {
			type: Number,
			default: 0,
		}
	},
	size: {
		type: String,
		enum: ['S', 'M', 'L']
	}
});

// productSchema.methods.greet = function () {
// 	console.log("HELLO!! HI!! HOWDY!!");
// 	console.log(`- from ${this.name}`);
// }

productSchema.methods.toggleIsOnSale = function () {
	this.isOnSale = !this.isOnSale;
	return this.save()
}

productSchema.methods.addCategory = function (newCategory) {
	this.categories.push(newCategory);
	return this.save()
}

productSchema.statics.fireSale = function () {
	return this.updateMany({},{$set:{isOnSale:true, price:0}})
}

const Product = mongoose.model('Product', productSchema);

const findProduct = async () => {
	const foundProduct = await Product.findOne({ name: "Mountain Bike" })
	console.log(foundProduct);
	await foundProduct.toggleIsOnSale();
	console.log(foundProduct);
	await foundProduct.addCategory('Outdoors')
	console.log(foundProduct);
}

Product.fireSale().then(res=> console.log(res))

// findProduct()


// const bike = new Product({ name: "Tire Pump", price: 19.50, categories: ['Cycling'] })

// bike.save()
// 	.then(data => {
// 		console.log('IT WORKS');
// 		console.log(data);
// 	}).catch(err => {
// 		console.log('OH NO ERROR! I KNOW!');
// 		console.log(err/* .errors.name.properties.message */);
// 	})


// Product.findOneAndUpdate({ name: 'Tire Pump' }, { price: 19.99 }, { new: true ,runValidators:true})
// 	.then(data => {
// 		console.log('IT WORKS');
// 		console.log(data);
// 	}).catch(err => {
// 		console.log('OH NO ERROR! I KNOW!');
// 		console.log(err/* .errors.name.properties.message */);
// 	})

// const bike = new Product({ name: "Cycling Jersey", price: 28.50, categories: ['Cycling'], size: 'S' })

// bike.save()
// 	.then(data => {
// 		console.log('IT WORKS');
// 		console.log(data);
// 	}).catch(err => {
// 		console.log('OH NO ERROR! I KNOW!');
// 		console.log(err/* .errors.name.properties.message */);
// 	})

