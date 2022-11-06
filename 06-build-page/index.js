"use strict"

const fs = require('fs');
const path = require('path');

function createProjectDist () {

    fs.mkdir(
        path.join(__dirname, 'project-dist'),
        {recursive: true},
        err => {
            if(err) throw err;
        }
    )
}

createProjectDist();

function createIndexFile () {

    fs.writeFile(
        path.join(__dirname, 'project-dist', 'index.html'),
        '',
        err => {
            if(err) throw err;
        }
    )
}

createIndexFile();

function createAssetsDir () {

    fs.mkdir(
        path.join(__dirname, 'project-dist', 'assets'),
        {recursive: true},
        err => {
            if(err) throw err;
        }
    );

    let direstories = [];
    fs.readdir(
        path.join(__dirname, 'assets'),
        {withFileTypes: true},
        (err, files) => {
            if(err) throw err;
            files.forEach(elem => {
                direstories.push(elem.name);

                for(let i = 0; i < direstories.length; i++) {
                    fs.mkdir(
                        path.join(__dirname, 'project-dist', 'assets', direstories[i]),
                        {recursive: true},
                        err => {
                            if(err) throw err;
                        }
                    );
                }
            })
            
        }
        
    );
}

createAssetsDir();


function createStyleFile() {

    fs.writeFile(
        path.join(__dirname, 'project-dist', 'style.css'),
        '',
        err => {
            if(err) throw err;
        }
    )
}

createStyleFile();

function changeTeamplate () {
    fs.readFile(
        path.join(__dirname, 'template.html'),
        'utf-8',
        (err, data) => {
            if(err) throw err;

            let indexText = '';
            indexText = data;


            fs.readdir(
                path.join(__dirname, 'components'),
                {withFileTypes: true},
                (err, files) => {
                    if(err) throw err;
                    // console.log(files);
                    const arr = [];
                    files.forEach(elem => {
                        let name = elem.name.replace(/\..+/g, '');
                        // console.log(name)
                        arr.push(name);

                        for(let i = 0; i < arr.length; i++) {
                            fs.readFile(
                                path.join(__dirname, 'components', `${arr[i]}.html`),
                                'utf-8',
                                (err, elemText) => {
                                    if(err) throw err;
                                    indexText = indexText.replace(`{{${arr[i]}}}`, elemText);

                                    fs.writeFile(
                                        path.join(__dirname, 'project-dist', 'index.html'),
                                        indexText,
                                        err => {
                                            if(err) throw err;
                                        }
                                    );
                                }
                            );
                        }
                        
                    })
                }
            );
        }
    );
}

changeTeamplate();


function collectCssFiles () {
    fs.readdir(
        path.join(__dirname, 'styles'),
        (err, files) => {
            files.forEach(elem => {
                if(elem.endsWith('.css')) {
                    fs.readFile(
                        path.join(__dirname, 'styles', elem),
                        'utf-8',
                        (err, text) => {
                            if(err) throw err;
    
                            fs.appendFile(
                                path.join(__dirname, 'project-dist', 'style.css'),
                                text,
                                err => {
                                    if(err) throw err;
                                }
                            );
                        }
                    );
                }
            })
        }
    );
}

collectCssFiles();

function copyAssets () {
    fs.readdir(
        path.join(__dirname, 'assets'),
        (err, files) => {
            if(err) throw err;
            files.forEach(elem => {
                fs.readdir(
                    path.join(__dirname, 'assets', elem),
                    (err, elements) => {
                        if(err) throw err;
                        elements.forEach(children => {
                            fs.copyFile(
                                path.join(__dirname, 'assets', elem, children),
                                path.join(__dirname, 'project-dist', 'assets', elem, children),
                                err => {
                                    if(err) throw err;
                                }
                            );
                        })
                    }
                );
            })
        }
    );
}

copyAssets();