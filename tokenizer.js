const LETTERS = /[a-z]/i;
const WHITESPACE = /\s/;
const DIGITS = /\d/;

const isParenthesis = c => (c === '(' || c === ')' );
const isLetter = c => LETTERS.test(c);
const isWhitespace = c => WHITESPACE.test(c);
const isDigit = c => DIGITS.test(c);

module.exports = function tokenizer(input) {
    const tokens = [];
    let current = 0;
    while (current < input.length) {
        let char = input[current];
        if (isParenthesis(char)) {
            tokens.push({
                type: 'parenthesis',
                value: char
            });
            current++;
            continue;
        }
        
        if (isLetter(char)) {
            let name = '';
            while (LETTERS.test(char)) {
                name += char;
                current++;
                char = input[current];
            }
            tokens.push({
                type: 'name',
                value: name
            })
            continue;
        }

        if (isWhitespace(char)) {
            current++;
            continue;
        }

        if (isDigit(char)) {
            let numRep = '';
            while (DIGITS.test(char)) {
                numRep += char;
                current++;
                char = input[current];
            }
            tokens.push({
                type: 'number',
                value: numRep
            })
            continue;
        }

        throw new Error(`Unknown char: '${char}'`)
    }
    return tokens;
}