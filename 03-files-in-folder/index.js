"use strict"

const fs = require('fs');
const path = require('path');

fs.readdir(
    path.join(__dirname , 'secret-folder'),
    {withFileTypes: true},
    (err, files) => {
        console.log("\nCurrent directory files:");

        if(err) {
            throw err;
        } else {
            files.forEach(elem => {
                if(elem.isFile()){
                    fs.stat(path.join(__dirname, 'secret-folder', elem.name),
                    (err, stats) => {
                    
                        console.log(elem.name.replace(/\.\w+/g, '') + ' - ' + elem.name.replace(/\w+\./g, '') + ' - ' + stats.size + ' ' + 'bite');
                
                    })
                }
            });
        }   
    }
)

