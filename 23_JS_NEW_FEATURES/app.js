
// // OLD SYNTAX
// function rollDie(numSides) {
//     if (numSides === undefined) {
//         numSides = 6;
//     }
//     return Math.floor(Math.random() * numSides) + 1;
// }

// // NEW SYNTAX
// function rollDie(numSides = 6) {
//     return Math.floor(Math.random() * numSides) + 1;

// }

// function greet(person, msg = "Hey There", punc = "!") {
//     console.log(`${msg}, ${person}${punc}`);
// }

// let arr = [4960, 8968, 4321, 4585, 4587, 8438, 4232, 7080, 6978, 2923];

// function spreadFnc(arr) {
//    return Math.min(...arr);
// }

// const obj = {
//     a: "2121",
//     b: "5",
//     c: "12121212",
// };

// const lotrGoodChars = ["Frodo Baggins", "Bilbo Baggins", "Merry", "Samwise Gamgee", "Pippin Took", "Gandalf"];
// const gotGoodChars = ["Ned Stark", "Jon Snow", "Sandor Clegane", "Daenerys Targaryen"];

// const feline = { legs: 4, family: "felidae" };
// const canine = { isFurry: true, family: "Caninae" };

// ["Frodo Baggins", "Bilbo Baggins", "Merry", "Samwise Gamgee", "Pippin Took", "Gandalf"];
// ["Ned Stark", "Jon Snow", "Sandor Clegane", "Daenerys Targaryen"];

const goodChars =
    [
        {
            name: "Frodo Baggins",
            gender: "Male",
            race: "Hobbit"
        },
        {
            name: "Bilbo Baggins",
            gender: "Male",
            race: "Hobbit",
        },
        {
            name: "Daenerys Targaryen",
            gender: "Female",
            race: "Mother of Dragons",
        }
    ];

function print(arr) {
    for (let char of arr) {
        console.log(char);
    }
}
print(goodChars);