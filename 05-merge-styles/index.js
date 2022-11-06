"use strict"

const fs = require('fs');
const path = require('path');

fs.stat(
    path.join(__dirname, 'project-dist', 'bundle.css'),
    function (err) {
        if(!err) {
            fs.unlink(
                path.join(__dirname, 'project-dist', 'bundle.css'),
                err => {
                    if(err) throw err;
                }
            )
        } else if (err.code === 'ENOENT') {
            fs.writeFile(
                path.join(__dirname, 'project-dist', 'bundle.css'),
                '',
                err => {
                    if(err) throw err;
                }
            )
        }
    }
)

fs.readdir(
    path.join(__dirname, 'styles'),
    (err, files) => {
        files.forEach(elem => {
        
            if(elem.endsWith('.css')){

                fs.readFile(
                    path.join(__dirname, 'styles', elem),
                    'utf-8',
                    (err, data) => {
                        if(err) throw err;

                        fs.appendFile(
                            path.join(__dirname, 'project-dist', 'bundle.css'),
                            data,
                            err => {
                                if(err) throw err;
                        });
                });
                
                // console.log(elem);
            }
        })
    }
)