const fs = require('fs');

setTimeout(() => console.log('timer 1 finished'), 0); //0 sec timer
setImmediate(() => console.log('immediate one has finished'));

fs.readFile('test-file.txt', () => {
  console.log('I/O finished');
});

console.log('hello from the top level code');

// lets see order of execution
// hello from the top level code
// timer 1 finished
// immediate one has finished
// I/O finished
