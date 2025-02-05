// accessing the file system , here fs in the bracket is the module of file system , now we can use all the functions in that module
const fs = require('fs');

// to read the file we use this format
const textIN = fs.readFileSync('./read-this.txt', 'utf-8');
console.log(textIN);

// to write in the file
const textOut = `this is what we know about the avacado: ${textIN}. \nthis File is Created on ${Date.now()}`
fs.writeFileSync('./write-me.txt' , textOut);
console.log("File Written");
