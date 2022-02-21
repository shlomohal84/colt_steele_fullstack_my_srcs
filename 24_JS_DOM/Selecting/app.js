// const allImages = document.getElementsByTagName('img');

const replaceAllImages = (allImages => {
    for (let img of allImages) {
        img.src = "https://images.unsplash.com/photo-1563281577-a7be47e20db9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80";
    }
});


const squareImages = document.getElementsByClassName('square');

const fnc = (squareImages => {
    for (let img of squareImages) {
        img.src = "https://upload.wikimedia.org/wikipedia/commons/e/e0/Male_Silkie.png";
    }
});