const prompt = require('prompt-sync')();

// Function to generate random math examples
function generateMathExamples(count) {
    const operations = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        // '*': (a, b) => a * b,
        // '/': (a, b) => (b !== 0 ? (a / b).toFixed(2) : 'undefined') // Avoid division by zero
    };

    const operators = Object.keys(operations); // Array of operation symbols
    const examples = [];

    for (let i = 0; i < count; i++) {
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operator = operators[Math.floor(Math.random() * operators.length)];

        const result = operations[operator](num1, num2); // Execute the operation
        examples.push(`${num1} ${operator} ${num2} =      `);
    }

    return examples;
}

// Generate 5 examples
const examples = generateMathExamples(5
);

// Print the examples
examples.forEach((example, index) => {
    console.log(`Example ${index + 1}: ${example}`);
    const prompt = require('prompt-sync')();

    let result = prompt('Napis spravny vysledek? ');{

        if (operatr = []) {
            console.log("SPRAVNY vysledek");
        } else {
            console.log("Špatny vysledek");

        }

    }
});