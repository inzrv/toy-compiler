const traverser = require('./traverse');

module.exports = function transformer(ast) {
    let newAst = {
      type: 'Program',
      body: [],
    };
  
    // Use a property named `context` to push nodes to their parent's `context`. 
    // Just take note that the context is a reference *from* the old ast *to* the
    // new ast.
    ast._context = newAst.body;
  
    traverser(ast, {
        NumberLiteral: {
        enter(node, parent) {
          parent._context.push({
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
          node._context = expression.arguments;
  
          if (parent.type !== 'CallExpression') {
            expression = {
              type: 'ExpressionStatement',
              expression: expression,
            };
          }
  
          // Push our (possibly wrapped) `CallExpression` to the `parent`'s
          // `context`.
          parent._context.push(expression);
        },
      }
    });

    return newAst;
  }