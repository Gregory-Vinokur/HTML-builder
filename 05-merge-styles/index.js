const { readdir, readFile, appendFile } = require('fs/promises');
const path = require('path');
const stylesFolder = path.join(__dirname, 'styles');
const bundleFolder = path.join(__dirname, 'project-dist');
const bundleFile = path.join(bundleFolder, 'bundle.css');

async function mergeStyles() {
    const stylesFiles = await readdir(stylesFolder);
    stylesFiles.forEach(async (file) => {
        if (path.extname(file) === '.css') {
            const textCss = await readFile(stylesFolder + '/' + file, 'utf-8');
            appendFile(bundleFile, textCss);
        }
    })
}
mergeStyles();

