const fs = require('fs');
const path = require('path');
const readline = require('readline');

let linkProject = path.join(__dirname, 'project-dist');
let linkTemp = path.join(__dirname, 'template.html'); 
let linkStyles = path.join(__dirname, 'styles'); 
let linkComp = path.join(__dirname, 'components');
let linkAssets = path.join(__dirname, 'assets');


fs.mkdir(linkProject, { recursive: true }, (err) => {
    if (err) throw err;    
});

//////////////////
let htmlWriteStream = fs.createWriteStream(path.join(linkProject, 'index.html'),'utf-8');
htmlWriteStream.on('error', (err) => console.log(err.message));
let htmlReadStream = fs.createReadStream(path.join(linkTemp), 'utf-8');
htmlReadStream.on('error', (err) => console.log(err.message));


let arrHTML = [];
async function createArr() {
    let rl_HTML = readline.createInterface({
        input: htmlReadStream,
        crlfDelay: Infinity                      
    });
    for await (const line of rl_HTML) {
        arrHTML.push(line);
    }
    for (let i = 0; i < arrHTML.length-1; i++) { 
        if (arrHTML[i].search(/{{(.+)}}/) >= 0) {
            let comp = '';
            nameComponent = arrHTML[i].replace(/.*{{(.+)}}.*/, '$1').trim();        
            let componentReadStream = fs.createReadStream(path.join(linkComp, `${nameComponent}.html`), 'utf-8');
            componentReadStream.on('error', (err) => console.log(err.message));
            componentReadStream.on('data', chunk => {comp = comp + chunk});
            componentReadStream.on('end', () => {
              arrHTML[i] = arrHTML[i].replace(/{{(.+)}}/, comp);
            });            
        }              
    }
    setTimeout(() => {htmlWriteStream.write(arrHTML.join('\n'))}, 2000)   
}
createArr();


////////////////
let styleWriteStream = fs.createWriteStream(path.join(linkProject, 'style.css'),'utf8');
styleWriteStream.on('error', (err) => console.log(err.message));

fs.readdir(linkStyles, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach(f => {      
        extension = f.name.split('.').slice(-1).join('');
        if (extension === 'css' && f.isFile()) {           
            let styleReadStream = fs.createReadStream(path.join(linkStyles, f.name), 'utf-8');
            styleReadStream.pipe(styleWriteStream);                                            
        }  
    });            
});

////////////////
copyDir(linkAssets, path.join(linkProject, 'assets'));

function copyDir(a, b) {
    fs.mkdir(b, { recursive: true }, (err) => {
        if (err) throw err;    
    });
    fs.readdir(a, { withFileTypes: true }, (err, files) => {
        if (err) throw err;
        files.forEach(f => {
            if (f.isFile()) {
                let assetsReadStream = fs.createReadStream(path.join(a, f.name));
                let assetsWriteStream = fs.createWriteStream(path.join(b, f.name));
                assetsReadStream.pipe(assetsWriteStream);
                assetsReadStream.on('error', (err) => console.log(err.message));
                assetsWriteStream.on('error', (err) => console.log(err.message));
            }
            else copyDir(path.join(a, f.name), path.join(b, f.name));        
        });          
    });
}



