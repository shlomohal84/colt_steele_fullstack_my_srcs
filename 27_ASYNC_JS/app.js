// const multiply = (x, y) => x * y;

// const square = x => multiply(x, x);

// const isRightTriangle = (a, b, c) => (
//     square(a) + square(b) === square(c)
// );
// console.log('BEFORE');
// isRightTriangle(3, 4, 5);
// console.log('AFTER');

setTimeout(() => {
    document.body.style.backgroundColor = 'red';
    setTimeout(() => {
        document.body.style.backgroundColor = 'orange';
        setTimeout(() => {
            document.body.style.backgroundColor = 'yellow';
            setTimeout(() => {
                document.body.style.backgroundColor = 'green';
                setTimeout(() => {
                    document.body.style.backgroundColor = 'blue';
                    setTimeout(() => {
                        document.body.style.backgroundColor = 'darkblue';
                        setTimeout(() => {
                            document.body.style.backgroundColor = 'purple';
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1000);
}, 1000);

// const delayedColorChange = (newColor, delay,doNext) => {
//     setTimeout(() => {
//         document.body.style.backgroundColor = newColor;
//         doNext && doNext();
//     }, delay);
// };

// delayedColorChange('red', 1000, () => {
//     delayedColorChange('orange',1000, () => {
//         delayedColorChange('yellow',1000, () => {
//             delayedColorChange('green',1000, () => {
//                 delayedColorChange('blue',1000, () => {
//                     delayedColorChange('purple',1000, () => {

//                     });
//                 });
//             });
//         });
//     });
// });

// new Promise((resolve, reject) => {
//     resolve();
// });

// const fakeRequest = (url) => {
//     return new Promise((resolve, reject) => {
//         const rand = Math.random();
//         setTimeout(() => {
//             if (rand < 0.7) {
//                 resolve("YOUR FAKE DATA HERE");
//             }
//             reject("Request Error!");
//         }, 1000);
//     });
// };

// fakeRequest('bitches/1')
//     .then((data) => {
//         console.log("DONE WITH REQUEST!");
//         console.log("Data is: ", data);
//     })
//     .catch((err) => {
//         console.log("OH NO! ",err);
//     });


// const delayedColorChange = (color, delay) => {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			document.body.style.backgroundColor = color;
// 			resolve();
// 		}, delay);
// 	});
// };

// delayedColorChange('red', 1000)
// 	.then(() => delayedColorChange('orange', 1000))
// 	.then(() => delayedColorChange('yellow', 1000))
// 	.then(() => delayedColorChange('green', 1000))
// 	.then(() => delayedColorChange('blue', 1000))
// 	.then(() => delayedColorChange('indigo', 1000))
// 	.then(() => delayedColorChange('violet', 1000))
// 	;

// async function hello() {

// }

// const sing = async () => {
// 	throw "OH NO, PROBLEM!";
// 	return "LA LA LA LA";
// };
// sing()
// 	.then(data => console.log("PROMISE RESOLVED WITH:", data))
// 	.catch(err => {
// 		console.log("OH NO, PROMISE REJECTED!");
// 		console.log(err);
// 	});

// const login = async (username, password) => {
// 	if (!username || !password) throw "Missing Credentials";
// 	if (password === 'corgifeetarecute') return 'WELCOME';
// 	throw 'Invalid Password'
// };

// login('abcd','corgifeetarecute')
// 	.then(msg => {
// 		console.log("LOGGED IN!")
// 		console.log(msg)
// 	})
// 	.catch(err => {
// 		console.log("ERROR!");
// 		console.log(err);
// 	})

// const delayedColorChange = (color, delay) => {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			document.body.style.backgroundColor = color;
// 			resolve();
// 		}, delay);
// 	});
// };

// // delayedColorChange('red', 1000)
// // 	.then(() => delayedColorChange('orange', 1000))
// // 	.then(() => delayedColorChange('yellow', 1000))
// // 	.then(() => delayedColorChange('green', 1000))
// // 	.then(() => delayedColorChange('blue', 1000))
// // 	.then(() => delayedColorChange('indigo', 1000))
// // 	.then(() => delayedColorChange('violet', 1000))
// // 	;


// async function rainbow() {
// 	await delayedColorChange('red', 1000)
// 	await delayedColorChange('orange',1000)
// 	await delayedColorChange('yellow',1000)
// 	await delayedColorChange('green',1000)
// 	await delayedColorChange('blue',1000)
// 	await delayedColorChange('indigo',1000)
// 	await delayedColorChange('violet', 1000)
// 	return console.log("ALL DONE!"); 
// }

// // rainbow().then(() => console.log("END OF RAINBOW!"))


// async function printRainbow() {
// 	await (rainbow());
// 	console.log("END OF RAINBOW!");
// }

// printRainbow()

const fakeRequest = (url) => {
	return new Promise((resolve, reject) => {
		const rand = Math.random();
		setTimeout(() => {
			if (rand < 0.7) {
				resolve("YOUR FAKE DATA HERE");
			}
			reject("Connection Timeout! :(");
		}, 1000);
	});
};

async function makeTwoRequests() {
	try {
		let data1 = await fakeRequest('/page1');
		let data2 = await fakeRequest('/page2');
		console.log(data1);
	} catch (e) {
		console.log('CAUGHT AN ERROR!');
		console.log('error is:', e);
	}
}

