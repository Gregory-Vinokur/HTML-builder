const fs = require('fs');
const readline = require('readline');
const path = require("path");
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });
const pathToFile = path.join(__dirname, "text.txt");

const sayGreeting = () => {
    console.log("\x1b[2m", "\x1b[37m", "\x1b[44m", "Hello! Enter some text, please.", "\x1b[0m");
}

const sayGoodbye = () => {
    console.log("\x1b[2m", "\x1b[37m", "\x1b[46m", "Thank you and goodbye!", "\x1b[0m");
    process.exit();
}

const createFile = () => {
    fs.open(pathToFile, 'a', () => {

    });
}


const writeToFile = () => {
    rl.on('line', (input) => {
        if (input !== 'exit') {
            fs.appendFile(pathToFile, `${input} \n`, () => {

            })
            console.log("\x1b[2m", "\x1b[37m", "\x1b[44m", "Enter some more text, please.", "\x1b[0m");
        } else {
            sayGoodbye();
        }
    });
}

const initTask = () => {
    sayGreeting();
    createFile();
    writeToFile();
    rl.on('SIGINT', sayGoodbye);
}

initTask();