const input = document.querySelector('input');

input.addEventListener('input', function () {
    const h1 = document.querySelector('h1');
    if(input.value){
        h1.innerHTML = `Welcome, ${input.value}`;
    } else if(input.value.length === 0) {
        h1.innerHTML = '';
        h1.innerHTML = 'Enter Your Username';
    }
});