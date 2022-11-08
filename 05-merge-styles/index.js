const { readdir, readFile, writeFile } = require('fs/promises');
const path = require('path');
const stylesFolder = path.join(__dirname, 'styles');
const bundleFolder = path.join(__dirname, 'project-dist');
const bundleFile = path.join(bundleFolder, 'bundle.css');

async function mergeStyles() {
    let arr = [];
    const stylesTypes = await readdir(stylesFolder, { withFileTypes: true });
    const stylesFiles = await readdir(stylesFolder);
    for (let i = 0; i < stylesFiles.length; i++) {
        if (path.extname(stylesTypes[i].name) === '.css') {
            const textCss = await readFile(path.join(stylesFolder, stylesFiles[i]), 'utf-8');
            arr.push(textCss);
        }
    }
    writeFile(bundleFile, arr.join('\n'));
}

mergeStyles();

