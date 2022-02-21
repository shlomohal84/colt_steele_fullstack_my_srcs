const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']; //PLEASE DON'T CHANGE THIS LINE!

//YOU CODE GOES HERE:

const spans = document.querySelectorAll('span');

let i = 0;
for (let element of spans) {
    element.style.color = colors[i];
    i++;
}