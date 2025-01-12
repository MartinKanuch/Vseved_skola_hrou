const prompt = require('prompt-sync')();

// Function to generate random math examples
// Otazky z Matematiky pro 1.ročnik

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

        if (result = []) {
            console.log("SPRAVNY vysledek");
        } else {
            console.log("Špatny vysledek");

        }

    }
});

// Otazky z Matematiky pro 2.ročnik
function generateMathExamples1(count) {
    const operations1 = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        // '*': (a, b) => a * b,
        // '/': (a, b) => (b !== 0 ? (a / b).toFixed(2) : 'undefined') // Avoid division by zero
    };

    const operators1 = Object.keys(operations1); // Array of operation symbols
    const examples1 = [];

    for (let i = 0; i < count; i++) {
        const num3 = Math.floor(Math.random() * 1000);
        const num4 = Math.floor(Math.random() * 1000) + 1;
        const operator1 = operators1[Math.floor(Math.random() * operators1.length)];

        const result = operations1[operator1](num3, num4); // Execute the operation
        examples1.push(`${num3} ${operator1} ${num4} =      `);
    }

    return examples1;
}

// Generate 5 examples
const examples1 = generateMathExamples1(5
);

// Print the examples
examples1.forEach((example1, index) => {
    console.log(`Example ${index + 1}: ${example1}`);
    const prompt = require('prompt-sync')();

    let result = prompt('Napis spravny vysledek? ');{

        if (result = []) {
            console.log("SPRAVNY vysledek");
        } else {
            console.log("Špatny vysledek");

        }

    }
});