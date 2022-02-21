const express = require('express');
const app = express();
// console.dir(app);

// app.use((req, res) => {
// 	console.log("WE GOT A NEW REQUEST");
// 	// console.dir(req)
// 	// console.dir(res)
// 	// res.send("HELLO WE GOT YOUR REQUEST! THIS IS A RESPONSE!")
// 	res.send('<h1>This is my webpage!</h1>')
// 	// res.send([[1, 2, 3, 4], [5, 6, 7, 8]])
// });

app.get('/', (req, res) => {
	res.send("HOMEPAGE REQUEST!");
})

app.get('/r/:subreddit', (req, res) => {
	const { subreddit } = req.params
	res.send(`<h1>Browsing the ${subreddit} subreddit</h1>`)
})
app.get('/r/:subreddit/:postId', (req, res) => {
	const { subreddit, postId } = req.params
	res.send(`<h1>Viewing the post ID: ${postId} on ${subreddit} subreddit</h1>`)
})

app.post('/cats', (req, res) => {
	res.send("POST REQUEST TO /cats!!! THIS IS DIFFERENT THAN GET REQUEST");
})

app.get('/dogs', (req, res) => {
	res.send("DOGS REQUEST!");
});

app.get('/search', (req, res) => {
	const { q } = req.query;
	if (!q) {
		res.send("NOTHING FOUND IF NOTHING SEARCHED")
	} else {
		res.send(`<h1>Search results for: ${q}</h1>`)
	}

})

// with * only at the bottom of the code above
app.get('*', (req, res) => {
	res.send("I DON'T KNOW THAT PATH");
});



app.listen(8080, () => {
	console.log('LISTENING TO PORT 8080!');
});
