const { mkdir, writeFile, readFile, readdir, appendFile, copyFile } = require('fs/promises');
const path = require('path');
const templateFile = path.join(__dirname, 'template.html');
const destinationFolder = path.join(__dirname, 'project-dist');
const htmlFile = path.join(destinationFolder, 'index.html');
const componentsFolder = path.join(__dirname, 'components');

const createFolder = () => {
    mkdir(destinationFolder, { recursive: true });
}

const createHtmlFile = async () => {
    const dataTemplate = await readFile(templateFile, 'utf-8');
    await writeFile(htmlFile, dataTemplate);
    let newHtml = await readFile(htmlFile, 'utf-8');
    const compFiles = await readdir(componentsFolder, { withFileTypes: true });
    for (let i = 0; i < compFiles.length; i++) {
        const file = await readFile(path.join(componentsFolder, compFiles[i].name), 'utf-8');
        const regExp = new RegExp(`{{${(compFiles[i].name).split('.')[0]}}}`, 'g');
        newHtml = newHtml.replace(regExp, file);
    }
    await writeFile(htmlFile, newHtml);
}

const createStyles = async () => {
    let arr = [];
    const stylesFolder = path.join(__dirname, 'styles');
    const stylesTypes = await readdir(stylesFolder, { withFileTypes: true });
    const stylesFiles = await readdir(stylesFolder);
    const newStylesFile = path.join(destinationFolder, 'style.css');
    for (let i = 0; i < stylesFiles.length; i++) {
        if (path.extname(stylesTypes[i].name) === '.css') {
            const textCss = await readFile(path.join(stylesFolder, stylesFiles[i]), 'utf-8');
            arr.push(textCss);
        }
    }
    writeFile(newStylesFile, arr.join('\n'));
}

const addAssets = async () => {
    const assetsFolder = path.join(__dirname, 'assets');
    const newAssetsFolder = path.join(destinationFolder, 'assets');
    mkdir(newAssetsFolder, { recursive: true });

    const fontsFolder = path.join(assetsFolder, 'fonts');
    const fontsFiles = await readdir(fontsFolder);
    const newFonts = path.join(newAssetsFolder, 'fonts');
    mkdir(newFonts, { recursive: true });
    fontsFiles.forEach(file => {
        const srcFile = path.join(fontsFolder, file);
        const destFile = path.join(newFonts, file);
        copyFile(srcFile, destFile);
    });

    const imgFolder = path.join(assetsFolder, 'img');
    const imgFiles = await readdir(imgFolder);
    const newImg = path.join(newAssetsFolder, 'img');
    mkdir(newImg, { recursive: true });
    imgFiles.forEach(file => {
        const srcFile = path.join(imgFolder, file);
        const destFile = path.join(newImg, file);
        copyFile(srcFile, destFile);
    });

    const svgFolder = path.join(assetsFolder, 'svg');
    const svgFiles = await readdir(svgFolder);
    const newSvg = path.join(newAssetsFolder, 'svg');
    mkdir(newSvg, { recursive: true });
    svgFiles.forEach(file => {
        const srcFile = path.join(svgFolder, file);
        const destFile = path.join(newSvg, file);
        copyFile(srcFile, destFile);
    });
}

async function buildPage() {
    createFolder();
    createHtmlFile();
    createStyles();
    addAssets();
}

buildPage();
