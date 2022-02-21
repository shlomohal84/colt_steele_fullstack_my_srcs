let maximum = parseInt(prompt("Enter the maximum number:"));

while (!maximum) {
    maximum = parseInt(prompt("Enter a valid number:"));
}

const targetNum = Math.floor(Math.random() * maximum) + 1;

let guess = parseInt(prompt("Enter your first guess:"));
let attempts = 1;
while (parseInt(guess) !== targetNum) {
    if (guess === 'q') break;
    attempts++;
    if (guess > targetNum) {
        guess = prompt("Too high. Enter a new guess:");
    } else {
        guess = prompt("Too low. Enter a new guess:");

    }
}
if (guess === 'q') {
    console.log("Application Terminated")
} else {
    console.log(`You got it! Number was: ${targetNum}`);
    console.log(`you had: ${attempts} guesses`);
}
