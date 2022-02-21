
const generateRandom = () => {
    return Math.floor(Math.random() * 255) + 1;
};

const title = document.querySelector('h1');
const btnApply = document.querySelector('#apply');
const body = document.querySelector('body');


function changeBg() {
    const arrRandoms = [];
    for (let i = 0; i < 3; i++) {
        arrRandoms.push(generateRandom());
    }
    // console.log(arrRandoms);
    body.style.backgroundColor = `rgb(${arrRandoms[0]},${arrRandoms[1]},${arrRandoms[2]})`;
    title.innerText = (`rgb(${arrRandoms[0]},${arrRandoms[1]},${arrRandoms[2]})`);

}

btnApply.addEventListener('click', changeBg);



// const x = () => {
//     for (let element of body.computedStyleMap()) {
//         console.log(element);
//         // console.log(val);
        
//     }
// };

// x(); 