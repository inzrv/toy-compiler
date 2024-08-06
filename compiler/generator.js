module.exports = function generator(node) {
    if (node.type === 'NumberLiteral') {
        return node.value;
    }
    if (node.type === 'Identifier') {
        return node.name;
    }
    if (node.type === 'CallExpression') {
        const funcName = generator(node.callee);
        const args = node.arguments.map(generator).join(', ');
        return `${funcName}(${args})`;
    }
    if (node.type === 'ExpressionStatement') {
        return `${generator(node.expression)}`;
    }
    if (node.type === 'Program') {
        return node.body.map(generator).join('\n');
    }
}