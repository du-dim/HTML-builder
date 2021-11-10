const fsp = require('fs').promises;
const path = require('path');
const fs = require('fs');

let linkFile1 = path.join(__dirname, 'files');
let linkFile2 = path.join(__dirname, 'files-copy');

copyDir(linkFile1, linkFile2)

async function copyDir(a, b) {
	const files = await fsp.readdir(a, { withFileTypes: true })
	await fsp.mkdir(b, { recursive: true }) 
	await fsp.rm(b, { recursive: true });
	await fsp.mkdir(b, { recursive: true });
	files.forEach(f => {
		if (f.isFile()) {
      let myReadStream = fs.createReadStream(path.join(a, f.name));
			let myWriteStream = fs.createWriteStream(path.join(b, f.name));
			myReadStream.pipe(myWriteStream);
			myReadStream.on('error', (err) => console.log(err.message));
			myWriteStream.on('error', (err) => console.log(err.message));
    } else  {
			copyDir(path.join(a, f.name), path.join(b, f.name)); 
		}           
  })
}
