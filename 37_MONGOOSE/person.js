const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopApp')
	.then(() => console.log('CONNECTION OPEN!'))
	.catch(err => console.log(err))


const personSchema = new mongoose.Schema({
	first: String,
	last: String
})

personSchema.virtual('fullName')
	.get(function () {
		return `${this.first} ${this.last}`
	})
	.set(function (val) {
		this.first = val.slice(0, val.indexOf(' '));
		this.last = val.slice(val.indexOf(' ') + 1)
	})

personSchema.pre('save', async function () {
	this.first = 'YO'
	this.last = 'MAMA'
	console.log('ABOUT TO SAVE!!!')
})
personSchema.post('save', async function () {
	console.log('JUST SAVED!!!')
})

const Person = mongoose.model('Person', personSchema);



// const wanker = new Person({ first: "Wanker", last: "McTwat" });

// wanker.fullName = 'Axl Rose'
// wanker.save()