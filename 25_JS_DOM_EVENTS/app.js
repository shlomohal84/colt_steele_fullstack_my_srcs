// // const btn = document.querySelector('#v2');

// // btn.onclick = function () {
// //     console.log("YOU CLICKED ME!");
// //     console.log("I HOPE IT WORKED!");
// // };

// // function scream() {
// //     console.log("AAAAAAAH");
// //     console.log("STOP TOUCHING ME!");
// // };

// // btn.onmouseenter = scream;

// // document.querySelector('h1').onclick = function () {
// //     alert('You clicked the h1!');
// // };

// // const btn3 = document.querySelector('#v3');
// // btn3.addEventListener('click', function () {
// //     alert("CLICKED!");
// // });

// // let state = true;
// // function twistAndShout() {
// //     if (state === true) {
// //         console.log('TWIST!');
// //         return state = !state;
// //     }
// //     console.log('SHOUT');
// //     return state = !state;

// // }

// // const tasButton = document.querySelector('#tas');

// // // tasButton.onclick = twist;
// // // tasButton.onclick = shout;

// // tasButton.addEventListener('click', twistAndShout);



// const makeRandColor = () => {
//     const r = Math.floor(Math.random() * 255) + 1;
//     const g = Math.floor(Math.random() * 255) + 1;
//     const b = Math.floor(Math.random() * 255) + 1;
//     return `rgb(${r},${g},${b})`;
// };

// const buttons = document.querySelectorAll('button');

// for (let element of buttons) {
//     element.addEventListener('click', colorize);
// };

// const h1s = document.querySelectorAll('h1');

// for (let element of h1s) {
//     element.addEventListener('click', colorize);
// }

// function colorize() {
//     this.style.backgroundColor = makeRandColor();
//     this.style.color = makeRandColor();
// }


// const button = document.querySelector('button');
// button.addEventListener('click', function (evt) {
//     console.log(evt);
// });


// const input = document.querySelector('input');
// input.addEventListener('keydown', function (evt) {
//     console.log(evt.code);
//     console.log(evt.key);
// });
// // input.addEventListener('keyup', function () {
// //     console.log('KEYUP!');
// // });


// window.addEventListener('keydown', function (evt) {
//     switch (evt.code) {
//         case 'ArrowUp':
//             console.log("UP!");
//             break;
//         case 'ArrowDown':
//             console.log("DOWN!");
//             break;
//         case 'ArrowLeft':
//             console.log("LEFT!");
//             break;
//         case 'ArrowRight':
//             console.log("RIGHT!");
//             break;
//         default:
//             console.log('IGNORED');
//     }
// });

const tweetForm = document.querySelector('#tweet-form');

const tweetList = document.querySelector('#tweets');

tweetForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    // const nameInput = document.querySelectorAll('input')[0];
    // const tweetInput = document.querySelectorAll('input')[1];
    const usernameInput = tweetForm.elements.username;
    const tweetInput = tweetForm.elements.tweet;
    addTweet(usernameInput.value, tweetInput.value);
    usernameInput.value = '';
    tweetInput.value = '';

});

const addTweet = (username, tweet) => {
    const newTweet = document.createElement('li');
    const bTag = document.createElement('b');
    bTag.append(username);
    newTweet.append(bTag);
    console.log(newTweet);
    newTweet.append(` - ${tweet}`);
    tweetList.append(newTweet);
    console.log(tweetList);
};