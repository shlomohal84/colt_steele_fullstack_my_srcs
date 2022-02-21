// const data = { "ticker": { "base": "BTC", "target": "USD", "price": "46488.02654907", "volume": "91659.40132919", "change": "96.42958428" }, "timestamp": 1631108403, "success": true, "error": "" };

// const str = JSON.stringify(data)


// const objData =
// {
// 	name: 'John',
// 	lastName: 'Doe',
// 	occupation: undefined
// };

// const objToJSON = JSON.stringify(objData)

// const req = new XMLHttpRequest();
// req.onload = function () {
// 	console.log("ALL DONE WITH REQUEST");
// 	const data = JSON.parse(this.responseText);
// 	console.log(Number(data.ticker.price).toFixed(2));
// }

// req.onerror = function () {
// 	console.log("ERROR");
// 	console.log(this);
// }

// req.open('GET', 'https://api.cryptonator.com/api/ticker/btc-usd');
// req.send()

// fetch('https://api.cryptonator.com/api/ticker/btc-usd')
// 	.then(res => {
// 		console.log("RESPONSE WAITING TO PARSE...", res);
// 		return res.json()
// 	})
// 	.then(data => {
// 		console.log("DATA PARSED", data);
// 		let price = parseFloat(data.ticker.price).toFixed(2);
// 		console.log(price);
// 	})
// 	.catch(e => {
// 		console.log("ERROR OH NO I KNOW!",e);
// 	})

// const fetchBitcoinPrice = async () => {
// 	try {
// 		const res = await fetch('https://api.cryptonator.com/api/ticker/btc-usd');
// 		const data = await res.json();
// 		console.log(parseFloat(data.ticker.price).toFixed(2));
// 	} catch (e) {
// 		console.log("SOMETHING WENT WRONG!!!",e);
// 	}
// }


// axios.get('https://api.cryptonator.com/api/ticker/btc-usd')
// 	.then(res => {
// 		console.log(res.data.ticker.price);
// 	})
// 	.catch(err => {
// 		console.log('ERROR', err)
// 	})


// const fetchBitcoinPrice = async () => {
// 	try {
// 		const res = await axios.get('https://api.cryptonator.com/api/ticker/btc-usd');
// 		console.log(res.data.ticker.price);
// 	} catch (err) {
// 		console.log('ERROR', err)
// 	}
// }
// const jokeOutPut = document.querySelector('#joke-output')
// const btn = document.querySelector('#btn')

// const addNewJoke = async () => {
// 	const jokeText = await getDadJoke()
// 	console.log(jokeText);
// 	const newLi = document.createElement('li');
// 	newLi.append(jokeText)
// 	jokeOutPut.append(newLi)
// }

// const getDadJoke = async () => {
// 	try {
// 		const config = { headers: { Accept: 'application/json' } }
// 		const res = await axios.get('https://icanhazdadjoke.com/', config)
// 		// console.log(res.data.joke)
// 		return res.data.joke
// 	} catch (err) {
// 		return 'NO JOKES AVAILABLE!! SORRY :('
// 	}
// }

// btn.addEventListener('click',addNewJoke)
