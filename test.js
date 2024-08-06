const tokenizer = require('./tokenizer');
const parser = require('./parser');
const transformer = require('./transformer');
const generator = require('./generator');
const compiler = require('./compiler');
const assert = require('assert');
  
const input  = '(f 1 (g 2 3))';
const output = 'f(1, g(2, 3))';

const tokens = [
  { type: 'parenthesis',  value: '(' },
  { type: 'name',         value: 'f' },
  { type: 'number',       value: '1' },
  { type: 'parenthesis',  value: '(' },
  { type: 'name',         value: 'g' },
  { type: 'number',       value: '2' },
  { type: 'number',       value: '3' },
  { type: 'parenthesis',  value: ')' },
  { type: 'parenthesis',  value: ')' }
];

const lispAST = {
  type: 'Program',
  body: [{
    type: 'CallExpression',
    name: 'f',
    params: [{
      type: 'NumberLiteral',
      value: '1'
    }, {
      type: 'CallExpression',
      name: 'g',
      params: [{
        type: 'NumberLiteral',
        value: '2'
      }, {
        type: 'NumberLiteral',
        value: '3'
      }]
    }]
  }]
};

const jsAST = {
  type: 'Program',
  body: [{
    type: 'ExpressionStatement',
    expression: {
      type: 'CallExpression',
      callee: {
        type: 'Identifier',
        name: 'f'
      },
      arguments: [{
        type: 'NumberLiteral',
        value: '1'
      }, {
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: 'g'
        },
        arguments: [{
          type: 'NumberLiteral',
          value: '2'
        }, {
          type: 'NumberLiteral',
          value: '3'
        }]
      }]
    }
  }]
};

assert.deepStrictEqual(tokenizer(input), tokens, 'Tokenizer should turn `input` string into `tokens` array');
assert.deepStrictEqual(parser(tokens), lispAST, 'Parser should turn `tokens` array into `lispAST`');
assert.deepStrictEqual(transformer(lispAST), jsAST, 'Transformer should turn `lispAST` into a `jsAST`');
assert.deepStrictEqual(generator(jsAST), output, 'Code Generator should turn `jsAST` into `output` string');
assert.deepStrictEqual(compiler(input), output, 'Compiler should turn `input` into `output`');

console.log('All Passed!');