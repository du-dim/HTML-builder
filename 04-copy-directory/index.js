const fs = require('fs');
const path = require('path');

let linkFile1 = path.join(__dirname, 'files');
let linkFile2 = path.join(__dirname, 'files-copy');

deleteFile(linkFile2);
//deleteFolder(linkFile2);
copyDir(linkFile1, linkFile2);

function copyDir(a, b) {
    fs.mkdir(b, { recursive: true }, (err) => {
        if (err) throw err;    
    });
    fs.readdir(a, { withFileTypes: true }, (err, files) => {
        if (err) throw err;
        files.forEach(f => {
            if (f.isFile()) {
                let myReadStream = fs.createReadStream(path.join(a, f.name));
                let myWriteStream = fs.createWriteStream(path.join(b, f.name));
                myReadStream.pipe(myWriteStream);
                myReadStream.on('error', (err) => console.log(err.message));
                myWriteStream.on('error', (err) => console.log(err.message));
            }
            else copyDir(path.join(a, f.name), path.join(b, f.name));        
        });          
    });
}

async function deleteFile(a) {
    fs.readdir(path.join(a, '..'), (err, folders) => {
        if (err) throw err;
        let link = `${__dirname}\\`;
        if (folders.includes(a.replace(link, '').trim())) {  
            fs.readdir(a, { withFileTypes: true }, (err, files) => {
                if (err) throw err;
                files.forEach(f => {
                    if (f.isFile()) {
                        fs.rm(path.join(a, f.name), (err) => {
                            if (err) throw err;
                        })
                    }
                    else return deleteFile(path.join(a, f.name));        
                });          
            });
        }  
    });
}
/*
async function deleteFolder(a) {
    fs.readdir(a, { withFileTypes: true }, (err, dir) => {
        console.log(dir.length);
        if (err) throw err;        
        if (dir.length > 0) {
            dir.forEach(d => {
                deleteFolder(path.join(a, d.name))
            })
        };
        if (dir.length === 0) {
            fs.rm(a, { recursive: true }, (err) => {
                if (err) throw err;    
            })
        }   
    });   
}
*/




