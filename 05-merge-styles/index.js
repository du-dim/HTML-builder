
/*
const fs = require('fs');
const path = require('path');

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
            myReadStream.pipe(myWriteStream);          
        }  
    });            
});

*/
/*
const { readdir, readFile, writeFile, stat, appendFile } = require('fs/promises');
const { join, extname } = require('path');

const stylesPath = join(__dirname, 'styles');
const bandlePath = join(__dirname, 'files-copy', 'project-dist', 'bundle.css');

async function createStyleFile () {
    await writeFile(bandlePath, '');
    const items = await readdir(stylesPath, { withFileTypes: true });
    for (let item of items) {
        await readFile(stylesPath, item)
            if (item.isFile() == true && extname(item).slice(1) == 'css');
            await appendFile(bandlePath);
        }
}
createStyleFile();
*/