const fs = require("fs");
const prompt = require("prompt-sync")();

// cita data z geography data.json
let countriesAndCities = [];
try {
    const data = fs.readFileSync("geography_data.json", "utf8");
    countriesAndCities = JSON.parse(data);
} catch (err) {
    console.error("Error reading geography_data.json:", err.message);
    process.exit(1);
}

// Function to generate a random question
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

// Utility to shuffle options
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Conduct geography test
function startGeographyTest(testNumber, mainMenuCallback) {
    console.log(`\nStarting Geography Test ${testNumber}. Answer 5 questions!\n`);

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
    }

    saveResults(testNumber, correctAnswers, wrongAnswers);
    console.log("\nTest completed!");
    console.log(`Correct: ${correctAnswers}, Wrong: ${wrongAnswers}`);

    // Ask if the user wants to repeat the test or return to the menu
    const nextAction = prompt("Do you want to take a new test (y) or return to the menu (m)? ").toLowerCase();

    if (nextAction === "y") {
        startGeographyTest(testNumber + 1, mainMenuCallback);
    } else if (nextAction === "m") {
        mainMenuCallback();
    } else {
        console.log("Invalid choice. Returning to the menu.");
        mainMenuCallback();
    }
}

function saveResults(testNumber, correct, wrong) {
    const date = new Date().toLocaleDateString("en-GB");
    const result = { date, testNumber, correct, wrong };

    const fileName = "geography_results.json";
    let results = JSON.parse(fs.readFileSync(fileName, "utf8"));

    results.push(result); // Add the new result
    fs.writeFileSync(fileName, JSON.stringify(results, null, 4), "utf8"); // ulozi nove data
    console.log(`Results saved to ${fileName}`);
}

module.exports = { startGeographyTest };
