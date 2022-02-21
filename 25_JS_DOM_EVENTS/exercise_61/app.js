// Leave the next line, the form must be assigned to a variable named 'form' in order for the exercise test to pass
const form = document.querySelector('form');
const listElement = document.querySelector('#list');
const btn = document.querySelector('button');

form.addEventListener('submit', function (evt) {
    // console.log('test');
    evt.preventDefault();

    const product = document.querySelector('#product');
    const qty = document.querySelector('#qty');

    const newEntry = document.createElement('li');
    newEntry.innerText = (`${qty.value} ${product.value}`);
    listElement.appendChild(newEntry);

    product.value = '';
    qty.value = '';
});