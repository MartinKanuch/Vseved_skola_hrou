const prompt = require("prompt-sync")();
const fs = require("fs");

function startQuiz(testType, callback) {
    let continueQuiz = true;

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

    const filePath = testType === "Math 1" ? 'math1.json' : 'math2.json';
    let existingData = [];


    if (fs.existsSync(filePath)) {
        try {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            existingData = fileContent ? JSON.parse(fileContent) : [];
        } catch (error) {
            console.error('Error reading results file, initializing new data:', error);
            existingData = [];
        }
    }

    let testCount = existingData.length + 1; // Determine next test number

    while (continueQuiz) {
        console.log(`\nStarting ${testType} Test #${testCount}...\n`);

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
        console.log(`Correct answers: ${summary.correct}, Wrong answers: ${summary.wrong}\n`);

        const currentDate = formatDate(new Date());
        const resultData = {
            testNumber: testCount,
            correct: results.correct,
            wrong: results.wrong,
            date: currentDate,
        };

        existingData.push(resultData);
        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf8');

        testCount++;

        let userChoice;
        do {
            userChoice = prompt('Do you want to continue? (yes/no): ').trim().toLowerCase();
        } while (!["yes", "y", "no", "n"].includes(userChoice));

        continueQuiz = userChoice.startsWith('y');

        // Reset results for the next test
        results.correct = 0;
        results.wrong = 0;
    }

    console.log('\nReturning to main menu...\n');
    if (callback) callback();
}

function generateMathExamples(count) {
    const examples = [];
    for (let i = 0; i < count; i++) {
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        examples.push({
            question: `${num1} + ${num2} = `,
            answer: num1 + num2
        });
    }
    return examples;
}

function formatDate(date) {
    return date.toISOString().split('T')[0];
}

module.exports.startQuiz = startQuiz;




