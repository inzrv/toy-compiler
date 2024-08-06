const tokenizer = require('./tokenizer');
const parser = require('./parser');
const transformer = require('./transformer');
const generator = require('./generator');

module.exports = function compiler(input) {
    // 1. Lexical Analysis -
    //      Breaks the input code (string) into the basic syntax
    //      of the language (array of objects)
    const tokens = tokenizer(input);

    // 2. Syntactic Analysis -
    //      Transforms the tokens (array of objects) into an
    //      AST (tree of objects) which represents our program
    const lispAST = parser(tokens);
    // console.log(JSON.stringify(lispAST, null, 4));
    
    // 3. Transformation - Transforms our original Lisp AST into
    //                     our target Javascript AST
    const jsAST = transformer(lispAST);
    // console.log(JSON.stringify(jsAST, null, 4));

    // 4. Code Generation - Transforms our target AST (object of objects)
    //                      into actual code (string)
    const jsCode = generator(jsAST);
    return jsCode;
}