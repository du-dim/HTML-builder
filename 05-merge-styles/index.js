const fs = require('fs');
const path = require('path');
const readline = require('readline');


let linkFile1 = path.join(__dirname, 'styles');
let linkFile2 = path.join(__dirname, 'project-dist', 'bundle.css');

let myWriteStream = fs.createWriteStream(linkFile2,'utf-8');
myWriteStream.on('error', (err) => console.log(err.message));

fs.readdir(linkFile1, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach(f => {      
        extension = f.name.split('.').slice(-1).join('');
        if (extension === 'css' && f.isFile()) {           
            let myReadStream = fs.createReadStream(path.join(linkFile1, f.name), 'utf-8');
            myReadStream.on('error', (err) => console.log(err.message));
            let rl = readline.createInterface({
                input: myReadStream                            
            });
            rl.on('line', (line) => {                
                myWriteStream.write(line + '\n');
            });              
        }  
    });            
});


