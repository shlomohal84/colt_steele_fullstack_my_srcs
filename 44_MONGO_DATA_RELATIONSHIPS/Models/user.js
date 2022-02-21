const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/relationshipDemo')
	.then(() => {
		console.log('DB CONNECTED!')
	}).catch(e => {
		console.log('OH NO MONGO CONNECTION ERROR!');
		console.log(e);
	})

const userSchema = mongoose.Schema({
	first: String,
	last: String,
	addresses: [
		{
			_id: { id: false },
			street: String,
			city: String,
			state: String,
			country: String
		}
	]
});

const User = mongoose.model('User', userSchema);

const makeUser = (async () => {
	const u = new User({
		first: 'Johnny',
		last: 'Cash',
	})
	u.addresses.push({
		street: 'Ring of Fire 32',
		city: 'Kingsland',
		state: 'Arkansas',
		country: 'USA'
	})
	const result = await u.save();
	console.log(result);
})

const addAddress = (async (id) => {
	const user = await User.findById(id);
	user.addresses.push(
		{
			street: 'Walk the Line 2003',
			city: 'Nashville',
			state: 'Tennesse',
			country: 'USA'
		}
	)
	const result = await user.save();
	console.log(result);
})

addAddress("618527188ee3af2eef6d834d")