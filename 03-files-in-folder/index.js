const fs = require('fs');
const path = require('path');

let linkFile = path.join(__dirname, 'secret-folder');

fs.readdir(linkFile, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach(f => {
        if (f.isFile()) {
            fileName = f.name.split('.').slice(0, -1).join('.');       
            extension = f.name.split('.').slice(-1).join('');
            fileSize = fs.statSync(path.join(linkFile, f.name)).size/1000;
            result = `${fileName} - ${extension} - ${fileSize}kb`;
            console.log(result);
        }
        else console.log(`Error: ${f.name} is a directory`); 
    });    
});