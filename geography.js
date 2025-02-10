const fs = require("fs");
const prompt = require("prompt-sync")();

// Load data from JSON
let countriesAndCities = [];
try {
    const data = fs.readFileSync("geography_data.json", "utf8");
    countriesAndCities = JSON.parse(data);
} catch (err) {
    console.error("Error reading geography_data.json:", err.message);
    process.exit(1);
}

// Generate random  city question
function generateCapitalCityQuestion() {
    const randomIndex = Math.floor(Math.random() * countriesAndCities.length);
    const selectedCountry = countriesAndCities[randomIndex];

    const options = [selectedCountry.capital, ...selectedCountry.cities];
    const shuffledOptions = shuffleArray(options);

    return {
        question: `What is the capital city of ${selectedCountry.country}?`,
        options: shuffledOptions,
        correctAnswerIndex: shuffledOptions.indexOf(selectedCountry.capital) + 1,
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

function startGeographyTest(mainMenuCallback) {
    const fileName = "geography_results.json";
    let existingResults = [];

    // Read existing results to determine the next test number
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

    console.log(`\nStarting Geography Test #${testNumber}. Answer 5 questions!\n`);

    let correctAnswers = 0;
    let wrongAnswers = 0;

    for (let i = 1; i <= 5; i++) {
        const questionObj = generateCapitalCityQuestion();
        console.log(`Question ${i}: ${questionObj.question}`);
        questionObj.options.forEach((opt, idx) => console.log(`${idx + 1}. ${opt}`));

        let userAnswer = prompt("Select the correct answer (1-4): ");
        while (isNaN(userAnswer) || userAnswer < 1 || userAnswer > 4) {
            userAnswer = prompt("Invalid choice. Please select 1-4: ");
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
console.log('');
    let userChoice;
    do {
        userChoice = prompt('Do you want to continue? (yes/no): ').trim().toLowerCase();
    } while (!["yes", "y", "no", "n"].includes(userChoice));

    if (userChoice.startsWith('y')) {
        startGeographyTest(mainMenuCallback);
    } else {
        console.log("\nReturning to the main menu...\n");
        mainMenuCallback();
    }
}


// Save  results
function saveResults(testNumber, correct, wrong) {
    const date = new Date().toLocaleDateString("en-GB");
    const result = { testNumber, date, correct, wrong };

    const fileName = "geography_results.json";
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

module.exports = { startGeographyTest };
