const compiler = require('./compiler');
const input = `(f 1 (g 2 3))`;
const output = compiler(input);
console.log(output);
