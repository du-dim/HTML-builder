const fs = require('fs');
const path = require('path');

let linkFile = path.join(__dirname, 'secret-folder');

fs.readdir(linkFile, { withFileTypes: true }, (error, files) => {
    if (error) throw err;
    files.forEach(f => {
        if (f.isFile()) {               
            fs.stat(path.join(linkFile, f.name), (err, file) => {
                if (err) throw err;
                fileName = f.name.split('.').slice(0, -1).join('.');       
                extension = f.name.split('.').slice(-1).join('');
                result = `${fileName} - ${extension} - ${file.size/1000}kb`;
                console.log(result);               
            });            
        }
        else console.log(`Error: ${f.name} is a directory`); 
    });    
});