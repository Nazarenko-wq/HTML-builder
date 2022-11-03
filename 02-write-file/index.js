"use strict"

const fs = require('fs');
const path = require('path');

const {stdout, stdin, stderr} = process;

fs.stat(
    path.join(__dirname),
    function (notExist) {
        if(notExist) {
            fs.writeFile(
                path.join(__dirname, 'text.txt'),
                'Hello',
                (err) => {
                    if(err) throw err;
            })
        } else {
            return;
        }
    }
)
    
stdout.write('Please, enter your text\n');

stdin.on('data', data => {
    const str = data.toString().split('').slice(0, -2).join('');

    if(str === 'exit') {
        stdout.write('See you');
        process.exit();
    } else {
        fs.appendFile(
            path.join(__dirname, 'text.txt'),
            str,
            err => {
                if(err) throw err;
        });
    }   
})

process.on('SIGINT', () => {
    stdout.write('See you');
    process.exit();
})
