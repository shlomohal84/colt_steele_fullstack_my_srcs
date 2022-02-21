const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send('<h1>Hello Section 33</h1>')
});

app.get('/dogs', (req, res) => {
	res.send('<h1>Hello dogs Route</h1>')
})

app.get('/search', (req, res) => {
	const { q } = req.query;
	console.log(req.query)
	res.send(`search results: ${q}`)
})
app.listen('3000', () => {
	console.log('LISTENING TO PORT 3000');
});