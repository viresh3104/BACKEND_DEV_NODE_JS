// console.log(arguments);
// console.log(require("module").wrapper);

// module.exports
const C = require('./modules/test-module-1');
const calc1 = new C();
console.log(calc1.add(2, 5));

// exports
// const calc2 = require("./test-module-2");
const { add, multiply } = require('.//modules/test-module-2'); // this will create 3 varibales
console.log(multiply(2, 5));

// caching
require('./modules/test-module-3')();
require('./modules/test-module-3')();
require('./modules/test-module-3')();
