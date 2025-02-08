const fs = require('fs');

// synchronous code for the reading file
const textIN = fs.readFileSync('./read-this.txt', 'utf-8');
console.log(textIN);

// same code in asynchronous code
fs.readFile('./read-this.txt', 'utf-8', (err, data) => {
  console.log(data);
});
console.log('Reading file.....');

// some callbacks (little bit complex)
fs.readFile('./start.txt', 'utf-8', (err, data) => {
  fs.readFile(`./${data}.txt`, 'utf-8', (err, data2) => {
    // here data is passed to the next function inside i.e. callback of first function
    console.log(data2);
  });
});
console.log('Reading....');
// this two asysnchrous funciton will print the output when all the code is executed

// one more example with the write task
fs.readFile('./start.txt', 'utf-8', (err, data) => {
  if (err) return console.log('Error'); // this will return form the function if there is an error
  fs.readFile(`./${data}.txt`, 'utf-8', (err, data2) => {
    // here data is passed to the next function inside i.e. callback of first function
    fs.writeFile('./final.txt', `${data}\n${data2}`, 'utf-8', (err) => {
      // this will take the data from the past two function
      console.log('your file has written');
    });
  });
});
