const traverser = require('./traverse');

module.exports = function transformer(ast) {
    let jsAST = {
      type: 'Program',
      body: [],
    };
  
    // Use a property named `context` to push nodes to their parent's `context`
    // The context is a reference from the old ast to the new ast
    ast.context = jsAST.body;
  
    traverser(ast, {
        NumberLiteral: {
          enter(node, parent) {
            parent.context.push({
              type: 'NumberLiteral',
              value: node.value,
            });
          },
      },
  
      CallExpression: {
        enter(node, parent) {
          let expression = {
            type: 'CallExpression',
            callee: {
              type: 'Identifier',
              name: node.name,
            },
            arguments: [],
          };
  
          // Save node context before wrapping
          node.context = expression.arguments;
  
          if (parent.type !== 'CallExpression') {
            expression = {
              type: 'ExpressionStatement',
              expression: expression,
            };
          }
  
          // Push our (possibly wrapped) `CallExpression` to the `parent`'s
          // `context`.
          parent.context.push(expression);
        },
      }
    });

    return jsAST;
  }