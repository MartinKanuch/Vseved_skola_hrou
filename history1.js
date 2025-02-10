const fs = require("fs");
const prompt = require("prompt-sync")();

// Load history data from JSON
let historyQuestions = [];
try {
    const data = fs.readFileSync("history1_data.json", "utf8");
    historyQuestions = JSON.parse(data);
} catch (err) {
    console.error("Error reading history1_data.json:", err.message);
    process.exit(1);
}

//  random history question
function generateHistoryQuestion() {
    const randomIndex = Math.floor(Math.random() * historyQuestions.length);
    const selectedQuestion = historyQuestions[randomIndex];

    const options = [selectedQuestion.correctAnswer, selectedQuestion.option2];
    const shuffledOptions = shuffleArray(options);

    return {
        question: selectedQuestion.question,
        options: shuffledOptions,
        correctAnswerIndex: shuffledOptions.indexOf(selectedQuestion.correctAnswer) + 1
    };
}
// Shuffle options
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function startHistoryTest1(mainMenuCallback) {
    const fileName = "history1_results.json";
    let existingResults = [];

    //  next test number
    if (fs.existsSync(fileName)) {
        try {
            const fileContent = fs.readFileSync(fileName, "utf8");
            existingResults = fileContent ? JSON.parse(fileContent) : [];
        } catch (error) {
            console.error("Error reading results file, initializing new data:", error);
            existingResults = [];
        }
    }

    let testNumber = existingResults.length + 1; // Assign next available test number

    console.log(`\nStarting History Test #${testNumber}. Answer 5 questions!\n`);

    let correctAnswers = 0;
    let wrongAnswers = 0;

    for (let i = 1; i <= 5; i++) {
        const questionObj = generateHistoryQuestion();
        console.log(`Question ${i}: ${questionObj.question}`);
        questionObj.options.forEach((opt, idx) => console.log(`${idx + 1}. ${opt}`));

        let userAnswer = prompt("Select the correct answer: ");
        while (isNaN(userAnswer) || userAnswer < 1 || userAnswer > 2) {
            userAnswer = prompt("Invalid choice. Please select 1 or 2: ");
        }

        if (parseInt(userAnswer) === questionObj.correctAnswerIndex) {
            console.log("Correct!");
            correctAnswers++;
        } else {
            console.log(`Wrong! The correct answer was Option ${questionObj.correctAnswerIndex}.`);
            wrongAnswers++;
        }
        console.log('');
    }

    saveResults(testNumber, correctAnswers, wrongAnswers);
    console.log("\nTest completed!");
    console.log(`Correct: ${correctAnswers}, Wrong: ${wrongAnswers}`);

    let userChoice;
    do {
        userChoice = prompt('Do you want to continue? (yes/no): ').trim().toLowerCase();
    } while (!["yes", "y", "no", "n"].includes(userChoice));

    if (userChoice.startsWith('y')) {
        startHistoryTest1(mainMenuCallback);
    } else {
        console.log("\nReturning to the main menu...\n");
        if (typeof mainMenuCallback === "function") {
            mainMenuCallback();
        }
    }
}


// Save test results
function saveResults(testNumber, correct, wrong) {
    const date = new Date().toLocaleDateString("en-GB");
    const result = { testNumber, date, correct, wrong };

    const fileName = "history1_results.json";
    let results = [];

    if (fs.existsSync(fileName)) {
        try {
            const fileContent = fs.readFileSync(fileName, "utf8");
            results = fileContent ? JSON.parse(fileContent) : [];
        } catch (error) {
            console.error("Error reading results file, initializing new data:", error);
            results = [];
        }
    }

    results.push(result); // Add the new test result
    fs.writeFileSync(fileName, JSON.stringify(results, null, 4), "utf8"); // Save new data
}

module.exports = { startHistoryTest1 };