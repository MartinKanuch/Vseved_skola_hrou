const prompt = require("prompt-sync")();
const { startGeographyTest } = require("./geography.js");
const math1 = require("./math1.js");
const math2 = require("./math2.js");
const { displayResultsOfEachTest, displayOverallResults } = require('./result.js');
const history1 = require("./history1.js");
const history2 = require("./history2.js");
const { displayBadgesMenu } = require("./badges.js");

// result files
const resultFiles = {
    "Geography_results": "geography_results.json",
    "Math1_results": "math1.json",
    "Math2_results": "math2.json",
    "History1_results": "history1_results.json",
    "History2_results": "history2_results.json"
};

// Menu options
const mainMenu = ["Geography", "Mathematics", "History", "Results", "Badges", "Exit"];
const mathMenu = ["Math Test 1", "Math Test 2"];
const histMenu = ["History Test 1", "History Test 2"];
const resultsMenu = [...Object.keys(resultFiles), "Back"];
console.log('');
// display menu and  user input
function displayMenu(options, callback) {
    console.log("\nPlease choose an option:");
    options.forEach((option, index) => {
        console.log(`${index + 1}. ${option}`);
    });

    let choice;
    while (true) {
        choice = parseInt(prompt("Enter your choice: "));
        if (!isNaN(choice) && choice >= 1 && choice <= options.length) {
            break;
        } else {
            console.log("Invalid choice. Please try again.");
        }
    }

    callback(options[choice - 1]);
}

// Main menu
function handleMainMenu(option) {
    if (option === "Mathematics") {
        displayMenu(mathMenu, handleMathMenu);
    } else if (option === "Geography") {
        startGeographyTest(() => displayMenu(mainMenu, handleMainMenu));
    } else if (option === "History") {
        displayMenu(histMenu, handleHistoryMenu);
    } else if (option === "Results") {
        displayMenu(resultsMenu, handleResultsMenu);
    } else if (option === "Badges") {
        displayBadgesMenu(() => displayMenu(mainMenu, handleMainMenu));
    } else if (option === "Exit") {
        console.log('');
        console.log("Thank you for using the Education Quiz. Goodbye!");
        process.exit();
    }
}

// Results menu
function handleResultsMenu(choice) {
    if (choice === "Back") {
        displayMenu(mainMenu, handleMainMenu);
        return;
    }

    function returnToTestResultsMenu(testFile) {
        displayMenu(["Each test result", "Overall results", "Back"], (subChoice) => {
            if (subChoice === "Each test result") {
                displayResultsOfEachTest(testFile, () => returnToTestResultsMenu(testFile));
            } else if (subChoice === "Overall results") {
                displayOverallResults(testFile, () => returnToTestResultsMenu(testFile));
            } else {
                displayMenu(resultsMenu, handleResultsMenu);
            }
        });
    }

    if (resultFiles[choice]) {
        returnToTestResultsMenu(resultFiles[choice]);
    }
}

// Math menu
function handleMathMenu(option) {
    if (option === "Math Test 1") {
        math1.startQuiz("Math 1", () => {
            console.log("\nReturning to the main menu...");
            displayMenu(mainMenu, handleMainMenu);
        });
    } else if (option === "Math Test 2") {
        math2.startQuiz("Math 2", () => {
            console.log("\nReturning to the main menu...");
            displayMenu(mainMenu, handleMainMenu);
        });
    }
}

// History menu
function handleHistoryMenu(option) {
    if (option === "History Test 1") {
        history1.startHistoryTest1(() => {
            console.log("\nReturning to the main menu...");
            displayMenu(mainMenu, handleMainMenu);
        });
    } else if (option === "History Test 2") {
        history2.startHistoryTest2(() => {
            console.log("\nReturning to the main menu...");
            displayMenu(mainMenu, handleMainMenu);
        });
    }
}

// Start app
console.log("Welcome to the Education Quiz!");
displayMenu(mainMenu, handleMainMenu);



