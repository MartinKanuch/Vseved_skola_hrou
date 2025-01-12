const prompt = require('prompt-sync')();

// Function to generate random math examples
// Otazky z Matematiky pro 1.ročnik

function generateMathExamples(count) {
    const operations = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
    };

    const operators = Object.keys(operations);
    const examples = [];

    for (let i = 0; i < count; i++) {
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operator = operators[Math.floor(Math.random() * operators.length)];
        const result = operations[operator](num1, num2);
        examples.push({ question: `${num1} ${operator} ${num2} =`, answer: result });
    }

    return examples;
}

function printMathExamples(mathProblem) {
    console.log(mathProblem.question);
}

function getUsersAnswer() {
    return parseInt(prompt('Napis spravny vysledek? '), 10);
}

function vyhodnotOdpoved(mathProblem) {
    let userAnswer = getUsersAnswer();
    if (userAnswer === mathProblem.answer) {
        console.log("SPRAVNY vysledek");
        return true;
    } else {
        console.log("ŠPATNY vysledek");
        return false;
    }
}

function startTest() {
    let result = [];
    let examples = generateMathExamples(10);
    examples.forEach((example) => {
        printMathExamples(example);
        let isCorrect = vyhodnotOdpoved(example);
        result.push(isCorrect);
    });

    console.log("Results:", result);
}

startTest();



// Otazky z Matematiky pro 2.ročnik
function generateMathExamples1(count) {
    const operations1 = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
    };

    const operators1 = Object.keys(operations1);
    const examples1 = [];

    for (let i = 0; i < count; i++) {
        const num3 = Math.floor(Math.random() * 1000);
        const num4 = Math.floor(Math.random() * 1000) + 1;
        const operator1 = operators1[Math.floor(Math.random() * operators1.length)];
        const result = operations1[operator1](num3, num4);
        examples1.push({ question: `${num3} ${operator1} ${num4} =`, answer: result });
    }

    return examples1;
}

function printMathExamples1(mathProblem) {
    console.log(mathProblem.question);
}

function getUsersAnswer1() {
    return parseInt(prompt('Napis spravny vysledek? '), 10);
}

function vyhodnotOdpoved1(mathProblem) {
    let userAnswer = getUsersAnswer1();
    if (userAnswer === mathProblem.answer) {
        console.log("SPRAVNY vysledek");
        return true;
    } else {
        console.log("ŠPATNY vysledek");
        return false;
    }
}

function startTest1() {
    let result = [];
    let examples1 = generateMathExamples1(5);
    examples1.forEach((example1) => {
        printMathExamples1(example1);
        let isCorrect = vyhodnotOdpoved1(example1);
        result.push(isCorrect);
    });

    console.log("Results:", result);
}

startTest1();