const compiler = require('./compiler');
const input = `(f (g 1 2) (h 3 4 5))`;
const output = compiler(input);
console.log(output);
