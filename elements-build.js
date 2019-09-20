const fs = require('fs-extra');
const concat = require('concat');
(async function build(){
    debugger
const files = [
    './dist/angulaeElements/runtime-es2015.js',
    './dist/angulaeElements/runtime-es5.js',
    './dist/angulaeElements/polyfills-es5.js',
    './dist/angulaeElements/polyfills-es2015.js',
    './dist/angulaeElements/scripts.js',
    './dist/angulaeElements/main-es5.js',
    './dist/angulaeElements/main-es2015.js'
]
await fs.ensureDir(elements)
await concat(files , 'elements/framework-poll.js')
await fs.copyFile('./dist/angulaeElements/styles.css','elements/styles.css')
await fs.copyFile('./dist/angulaeElements/assets/','elements/assets/')

})