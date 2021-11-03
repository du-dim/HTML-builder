const fs = require('fs');
const path = require('path');

let linkFile1 = path.join(__dirname, 'files');
let linkFile2 = path.join(__dirname, 'files-copy');

copyDir(linkFile1, linkFile2);

function copyDir(a, b) {
    fs.mkdir(b, { recursive: true }, (err) => {
        if (err) throw err;    
    });
    fs.readdir(a, { withFileTypes: true }, (err, files) => {
        if (err) throw err;
        files.forEach(f => {
            if (f.isFile()) {
                let myReadStream = fs.createReadStream(path.join(a, f.name), 'utf-8');
                let myWriteStream = fs.createWriteStream(path.join(b, f.name),'utf-8');
                myReadStream.pipe(myWriteStream);
                myReadStream.on('error', (err) => console.log(err.message));
                myWriteStream.on('error', (err) => console.log(err.message));
            }
            else copyDir(path.join(a, f.name), path.join(b, f.name));        
        });          
    });
}









