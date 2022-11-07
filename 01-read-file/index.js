let fs = require('fs');
let path = require('path');
const { stdout } = require('process');
let pathToFile = path.join(__dirname, 'text.txt');
let readableStream = fs.createReadStream(pathToFile, 'utf-8');

readableStream.on('data', function (text) {
    stdout.write(text);
});