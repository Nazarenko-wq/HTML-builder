"use strict"

const fs = require('fs');
const path = require('path');


fs.stat(
    path.join(__dirname, 'files-copy'),
    function (err) {
        if(!err) {
            return;
        } else if (err.code === 'ENOENT') {
            fs.mkdir(
                path.join(__dirname, 'files-copy'),
                err => {
                    if(err) throw err;
                }
            )
        }
    }
)


fs.readdir(
    path.join(__dirname, 'files'),
    (err, files) => {
        files.forEach(elem => {
            fs.copyFile(
                path.join(__dirname, 'files', elem),
                path.join(__dirname, 'files-copy',elem),
                err => {
                    if(err) {
                        throw err;
                    }
                }
            )
        })
    }
)
