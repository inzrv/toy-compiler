const isNumberToken = token => token.type === 'number';
const isOpenParenthesis = token => token.type === 'parenthesis' && token.value === '(';
const isCloseParenthesis = token => token.type === 'parenthesis' && token.value === ')';

module.exports = function parser(tokens) {
    let current = 0;

    function walk() {
        let token = tokens[current];
        if (isNumberToken(token)) {
            current++;
            return {
                type: 'NumberLiteral',
                value: token.value
            };
        }
        if (isOpenParenthesis(token)) {
            current++;
            token = tokens[current];
            let expression = {
                type: 'CallExpression',
                name: token.value,
                params: []
            }
            current++;
            token = tokens[current];
            while (!isCloseParenthesis(token)) {
                expression.params.push(walk())
                token = tokens[current];
            }
            // skip ')'
            current++;
            return expression;
        }

        throw new Error(`Unknown token: '${token.type}', '${token.value}'`);
    }

    let ast = {
        type: 'Program',
        body: []
    };

    while (current < tokens.length) {
        ast.body.push(walk());
    }

    return ast;
}