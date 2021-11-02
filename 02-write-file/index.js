const fs = require('fs');
const path = require('path');
const readline = require('readline');

let linkFile = path.join(__dirname, 'my-text.txt');
let myWriteStream = fs.createWriteStream(linkFile,'utf-8');
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Hello! Enter text');

rl.on('SIGINT', goodbye);
rl.on('line', (userInput) => {
    if (userInput === 'exit') goodbye();   
    myWriteStream.write(userInput + '\n');
});

myWriteStream.on('error', (err) => console.log(err.message));

function goodbye() {
    console.log('Goodbye!');
    process.exit();       
}

