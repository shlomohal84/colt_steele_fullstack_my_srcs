const fs = require('fs');
const folderName = process.argv[2] || 'Project';
// //asynchronous version
// fs.mkdir('Dogs', { recursive: true }, (err) => {
// 	console.log("DURING CALL BACK!");
// 	if (err) throw err;
// });
// console.log("I COME AFTER MKDIR IN THE FILE!!")


//synchronous version
try {
	fs.mkdirSync(folderName);
	fs.writeFileSync(`${folderName}/index.html`,'');
	fs.writeFileSync(`${folderName}/app.js`, '')
	fs.writeFileSync(`${folderName}/app.css`, '')
} catch (err) {
	console.log("SOMETHING WENT WRONG");
	console.log(err);
}