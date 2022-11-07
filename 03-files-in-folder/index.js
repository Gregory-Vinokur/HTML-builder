const { readdir, stat } = require('fs/promises');
const path = require('path');
const pathToFile = path.join(__dirname, 'secret-folder');

const getBaseName = (pathToItem, ext) => {
    return path.basename(pathToItem, ext);
}

const getExtension = (pathToItem) => {
    return path.extname(pathToItem).slice(1);
}

const getSize = (fileStats) => {
    return (fileStats.size / 1024).toFixed(3) + 'kb';
}

const readDirectory = async () => {
    const folderContent = await readdir(pathToFile);
    folderContent.forEach(async (item) => {
        const pathToItem = path.join(pathToFile, item);
        const itemStats = await stat(pathToItem);
        if (itemStats.isFile()) {
            const ext = path.extname(pathToItem);
            const basename = getBaseName(pathToItem, ext);
            const extension = getExtension(pathToItem);
            const fileSize = getSize(itemStats);
            const output = `${basename} - ${extension} - ${fileSize}`
            console.log(output);
        }
    })
}

readDirectory();