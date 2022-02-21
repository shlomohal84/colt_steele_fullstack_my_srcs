const quit = "quit";
const listArr = ["Wank", "Shower", "Wank again"];
let endListIndex = listArr.length + 1;
let inpt = "";
let numInpt = 1;
let index = 1;

while (inpt !== quit) {
    inpt = prompt(`Select an option: |"list"| |"new"| |"delete"| |"quit"|`);
    if (inpt === null || inpt.toLowerCase() === quit) {
        console.log("---------");
        console.log(`input: ${inpt}`);
        console.log("Application Terminated");
        break;
    } else if (inpt === "list" && inpt !== quit) {
        console.log("---------");
        console.log(`input: ${inpt}`);
        if (listArr.length !== 0) {
            console.log("TODO LIST:");
            for (let element of listArr) {
                console.log(`${index}. ${element}`);
                index++;
            }
        } else {
            console.log('List is empty');
            alert('List is empty');
        }

        index = 1;
    } else if (inpt === "new" && inpt !== quit) {
        console.log("---------");
        console.log(`input: ${inpt}`);
        inpt = prompt("add new TODO: ");
        listArr.push(inpt);
        console.log(`${endListIndex}."${inpt}" added to the list`);
        alert(`${endListIndex}."${inpt}" added to the list`);

    } else if (inpt === "delete") {
        numInpt = prompt("Type entry number to delete:");
        console.log(`input: ${numInpt}`);
        if (listArr.length === 0) {
            alert("List is empty");
        } else if ((numInpt > 0 && numInpt <= listArr.length) && numInpt !== NaN) {
            let deletedEntryStr = listArr.splice(numInpt - 1, 1);
            alert(`deleted ${numInpt}. ${deletedEntryStr}`);
        } else {
            console.log("Invalid Value")
            alert("Invalid value");
        }
    }
}

// while (inpt !== quit) {
//     if (inpt != quit) {
//         console.log(inpt);
//     } else if (inpt == null || inpt === quit) {
//         break;
//     }
// }