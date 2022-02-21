const form = document.querySelector('#search-form');
const imgContainer = document.querySelector('#img-container')

form.addEventListener('submit', async function (evt) {
	evt.preventDefault();
	clearContainer()
	const searchTerm = this.elements.query.value;
	const config = { params: { q: searchTerm } }
	const res = await axios.get(`https://api.tvmaze.com/search/shows`,config)
	addImages(res.data)
	this.elements.query.value = "";
})

const addImages = (shows) => {
	for (let elm of shows) {
		if (elm.show.image) {
			const img = document.createElement('IMG');
			img.src = elm.show.image.medium;
			imgContainer.append(img)
		}
	}
}

const clearContainer = () => {
	const images = document.querySelectorAll('img');
	console.log(images);
	for (let elm of images) {
		elm.remove()
	}
}