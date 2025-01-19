const prompt = require('prompt-sync')();
const fs = require("fs");

function startQuiz(callback) {
    let continueQuiz = true;
    let dailyTestCount = 1;

    const results = {
        correct: 0,
        wrong: 0,
        incrementCorrect() {
            this.correct++;
        },
        incrementWrong() {
            this.wrong++;
        },
        getSummary() {
            return { correct: this.correct, wrong: this.wrong };
        }
    };

    let currentDate = formatDate(new Date());

    while (continueQuiz) {
        console.log(`\nStarting quiz set #${dailyTestCount}...\n`);

        const examples = generateMathExamples(5);

        examples.forEach((example, index) => {
            const { question, answer } = example;
            const userInput = prompt(`Example ${index + 1}: ${question}`);
            const userAnswer = parseFloat(userInput);

            if (userAnswer === answer) {
                console.log('Correct!');
                results.incrementCorrect();
            } else {
                console.log(`Wrong! The correct answer is ${answer}`);
                results.incrementWrong();
            }
            console.log('');
        });
        const summary = results.getSummary();
        console.log(`Correct answers: ${summary.correct}, Wrong answers: ${summary.wrong}`);
        console.log('');

        const newDate = formatDate(new Date());
        if (newDate !== currentDate) {
            dailyTestCount = 1;
            currentDate = newDate;
        } else {
            dailyTestCount++;
        }

        // Structure the data for saving
        const resultData = {
            date: currentDate,             // The current date in dd-mm-yyyy format
            testNumber: dailyTestCount,    // Number of quiz sets (tests) executed today
            correct: results.correct,      // Number of correct answers
            wrong: results.wrong          // Number of wrong answers
        };

        // Append results to result.json
        fs.appendFileSync('math2.json', JSON.stringify(resultData, null, 2) + '\n', 'utf8');


        const userChoice = prompt('Do you want to continue? (yes/no): ').toLowerCase();
        continueQuiz = userChoice === 'yes' || userChoice === 'y';

        results.correct = 0;
        results.wrong = 0;
    }

    console.log('\nReturning to main menu...\n');
    if (callback) callback();
}

function generateMathExamples(count) {
    const examples = [];
    for (let i = 0; i < count; i++) {
        const num1 = Math.floor(Math.random() * 1000);
        const num2 = Math.floor(Math.random() * 1000);
        examples.push({
            question: `${num1} + ${num2} = `,
            answer: num1 + num2
        });
    }
    return examples;
}

// Function to format date as day-month-year (e.g., "18-01-2025")
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0'); // Ensure day is two digits (e.g., "03" instead of "3")
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure month is two digits (e.g., "01" instead of "1")
    const year = date.getFullYear();  // Get the full year (e.g., "2025")
    return `${day}-${month}-${year}`;
}


module.exports.startQuiz = startQuiz;