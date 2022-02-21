const port = 3000;
const express = require('express');
const app = express();
const morgan = require('morgan')

const AppError = require('./AppError')

const verifyPassword = (req, res, next) => {
	const { password } = req.query;
	if (password === 'chickenshit') {
		return next()
	}
	throw new AppError('Password Required', 401)
	// res.status(401)
	// throw new Error('Password Required',401)
	//  res.send("SORRY YOU NEED A PASSWORD")
}

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

app.get('/', (req, res) => {
	res.send('HOMEPAGE!')
	console.log(`REQUEST TIME: ${req.requestTime}`)
})

app.get('/error', (req, res) => {
	chicken.fly()
})

app.get('/dogs', verifyPassword, (req, res) => {
	res.send('WOOF WOOF!!!')
	console.log(`REQUEST TIME: ${req.requestTime}`)
})

app.get('/secret', verifyPassword, (req, res) => {
	res.send('MY SECRET IS: I\'M BATMAN!')
})

app.get('/admin', (req, res) => {
	throw new Error('YOU\'RE NOT AN ADMIN!',403)
})

app.use((req, res, next) => {
	res.status(404).send('404 FFFFFFUUUUUUUUUUUUUUUUUUUUUU!!!!!!!!!!!!!!!!!!!')
})

// app.use((err, req, res, next) => {
// 	console.log('******************');
// 	console.log('*******ERROR******');
// 	console.log('******************');
// 	// console.log(err)
// 	// res.status(500).send('OH BOY WE GOT AN ERROR')
// 	next(err)
// })

app.use((err, req, res, next) => {
	const { status = 500, message = 'Something went wrong!'} = err;
	res.status(status).send(message)
})

app.listen(port, () => console.log(`Serving on port ${port}`))