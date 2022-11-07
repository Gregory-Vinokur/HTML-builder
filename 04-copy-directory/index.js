const { readdir, copyFile, mkdir, unlink } = require('fs/promises');
const path = require('path');
const sourceFolder = path.join(__dirname, 'files');
const destinationFolder = path.join(__dirname, 'files-copy');

const makeCopy = async () => {
    const files = await readdir(sourceFolder);
    files.forEach(file => {
        const srcFile = path.join(sourceFolder, file);
        const destFile = path.join(destinationFolder, file);
        copyFile(srcFile, destFile);
    })
}

const makeDir = () => {
    mkdir(destinationFolder, { recursive: true });
}

const checkForUpdates = async () => {
    const destFiles = await readdir(destinationFolder);
    const files = await readdir(sourceFolder);
    const arrSrc = [];
    const arrDest = [];
    files.forEach(file => {
        arrSrc.push(file);
    })
    destFiles.forEach(file => {
        arrDest.push(file);
    })
    if (arrDest.length !== 0) {
        const sourceFiles = new Set(arrSrc);
        const deleteFiles = arrDest.filter(e => !sourceFiles.has(e));
        deleteFiles.forEach(file => {
            const fileForDelete = path.join(__dirname, 'files-copy', file);
            unlink(fileForDelete, (err) => {
                if (err) throw err;
            })
        })
    }
    if (arrDest.length !== 0) {
        makeCopy();
        console.log("\x1b[2m", "\x1b[37m", "\x1b[44m", "Directory updated successfully!", "\x1b[0m");
    }
    else {
        makeCopy();
        console.log("\x1b[2m", "\x1b[37m", "\x1b[44m", "Directory copied successfully!", "\x1b[0m");
    }
}

const copyDir = () => {
    makeDir();
    checkForUpdates();
}
copyDir();