
const fs = require('fs');
const path = require('path');

let linkFile = path.join(__dirname, 'text.txt');
let myReadStream = fs.createReadStream(linkFile, 'utf-8');
let str = '';

myReadStream.on('data', (chunk) => {str = str + chunk});
myReadStream.on('end', () => console.log(str.trim()));
myReadStream.on('error', (err) => console.log(err.message));

