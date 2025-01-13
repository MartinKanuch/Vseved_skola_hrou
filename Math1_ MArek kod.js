const prompt = require('prompt-sync')();
const results = require('./results'); // Import the results module

// Function to generate random math examples
function generateMathExamples(count) {
    const operations = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
    };

    const operators = Object.keys(operations); // Array of operation symbols
    const examples = [];

    for (let i = 0; i < count; i++) {
        let num1 = Math.floor(Math.random() * 10);
        let num2 = Math.floor(Math.random() * 10);

        // Ensure num1 is always greater than or equal to num2
        if (num1 < num2) {
            [num1, num2] = [num2, num1];
        }

        const operator = operators[Math.floor(Math.random() * operators.length)];
        const result = operations[operator](num1, num2); // Execute the operation
        examples.push({ question: `${num1} ${operator} ${num2} =`, answer: result });
    }

    return examples;
}

// Function to run the quiz
function startQuiz() {
    let continueQuiz = true;

    while (continueQuiz) {
        console.log(''); // medzera medzi riadkami

        const examples = generateMathExamples(5); // Generate 5 examples

        examples.forEach((example, index) => {
            const { question, answer } = example;
            const userInput = prompt(`Example ${index + 1}: ${question} `);
            const userAnswer = parseFloat(userInput);

            if (userAnswer === answer) {
                console.log('Correct!');
                results.incrementCorrect(); // Martin kod - pocitanie corret answer
            } else {
                console.log(`Wrong! The correct answer is ${answer}`);
                results.incrementWrong(); // MArtin kod - pocitanie wrong answer
            }

            console.log('');
        });

        // Martin funkcia - zobrazi aktualne vysledky
        results.displayResults();

        console.log('');
        console.log('The test is completed! Thanks!');
        console.log('');
        const continueInput = prompt('Do you want to take another test? (yes/no): ').toLowerCase();

        if (continueInput !== 'yes' && continueInput !== 'y') {
            continueQuiz = false;

            const continueMainMenu = prompt('Do you want back to "Main Menu" (yes/no): ').toLowerCase();
            // mainMenu();
        }

    }
}

// Start the quiz
startQuiz();