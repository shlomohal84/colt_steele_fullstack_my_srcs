const port = 3001;
const express = require('express');
const app = express();
const morgan = require('morgan')

app.use(morgan('dev'));

app.use((req, res, next) => {
	req.requestTime = new Date().toLocaleTimeString('en-gb')
	console.log(`Requested Method: '${req.method.toUpperCase()}' | Path: '${req.path}'`);
	next()
});

app.use('/dogs', (req, res, next) => {
	console.log('I LOVE DOGS');
	next()
})

const verifyPassword = (req, res, next) => {
	const { password } = req.query;
	password === 'chickenshit' ? next() : res.send("SORRY YOU NEED A PASSWORD")
}

app.get('/', (req, res) => {
	res.send(`${req.requestTime}`)
	console.log(`REQUEST TIME: ${req.requestTime}`)
})
app.get('/dogs', verifyPassword, (req, res) => {
	res.send('WOOF WOOF!!!')
	console.log(`REQUEST TIME: ${req.requestTime}`)
})

app.get('/secret', verifyPassword, (req, res) => {
	res.send('MY SECRET IS: I\'M BATMAN!')
})

app.use((req, res, next) => {
	res.status(404).send('404 FFFFFFUUUUUUUUUUUUUUUUUUUUUU!!!!!!!!!!!!!!!!!!!')
})

app.listen(port, () => console.log(`Serving on port ${port}`))