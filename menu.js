const prompt = require("prompt-sync")();
const { startGeographyTest } = require("./geography.js");
const math1 = require("./math1.js");
const math2 = require("./math2.js");
const { displayResultsOfEachTest, displayOverallResults } = require('./result.js');



// Menu
const mainMenu = ["Mathematics", "Geography", "Results", "Exit"];
const mathMenu = ["Math Test 1", "Math Test 2"];
const resultsMenu = ["Math Test 1 Results", "Math Test 2 Results", "Geography Results", "Back"];

//  display menu
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

    const selected = options[choice - 1];
    if (selected) {
        callback(selected);
    }
}

// main menu selection
function handleMainMenu(option) {
    if (option === "Mathematics") {
        displayMenu(mathMenu, handleMathMenu);
    } else if (option === "Geography") {
        startGeographyTest(() => {
            console.log("\nReturning to the main menu...");
            displayMenu(mainMenu, handleMainMenu);  // Correctly pass the callback
        });
    } else if (option === "Results") {
        const resultsMenu = ["Math Test 1 Results", "Math Test 2 Results", "Geography Results", "Back"];
        displayMenu(resultsMenu, handleResultsMenu);
    } else if (option === "Exit") {
        console.log("Thank you for using the Education Quiz. Goodbye!");
        process.exit();
    }
}


function handleResultsMenu(choice) {
    if (choice === "Math Test 1 Results") {
        displayMenu(["Each test result", "Overall results", "Back"], (subChoice) => {
            if (subChoice === "Each test result") {
                displayResultsOfEachTest('math1.json', () => {
                    console.log("\nReturning to the main menu...");
                    displayMenu(mainMenu, handleMainMenu);
                });
            } else if (subChoice === "Overall results") {
                displayOverallResults('math1.json', () => {
                    console.log("\nReturning to the main menu...");
                    displayMenu(mainMenu, handleMainMenu);
                });
            } else if (subChoice === "Back") {
                console.log("\nReturning to the main menu...");
                displayMenu(mainMenu, handleMainMenu);
            }
        });
    } else if (choice === "Math Test 2 Results") {
        displayMenu(["Each test result", "Overall results", "Back"], (subChoice) => {
            if (subChoice === "Each test result") {
                displayResultsOfEachTest('math2.json', () => {
                    console.log("\nReturning to the main menu...");
                    displayMenu(mainMenu, handleMainMenu);
                });
            } else if (subChoice === "Overall results") {
                displayOverallResults('math2.json', () => {
                    console.log("\nReturning to the main menu...");
                    displayMenu(mainMenu, handleMainMenu);
                });
            } else if (subChoice === "Back") {
                console.log("\nReturning to the main menu...");
                displayMenu(mainMenu, handleMainMenu);
            }
        });
    } else if (choice === "Geography Results") {
        displayMenu(["Each test result", "Overall results", "Back"], (subChoice) => {
            if (subChoice === "Each test result") {
                displayResultsOfEachTest('geography_results.json', () => {
                    console.log("\nReturning to the main menu...");
                    displayMenu(mainMenu, handleMainMenu);
                });
            } else if (subChoice === "Overall results") {
                displayOverallResults('geography_results.json', () => {
                    console.log("\nReturning to the main menu...");
                    displayMenu(mainMenu, handleMainMenu);
                });
            } else if (subChoice === "Back") {
                console.log("\nReturning to the main menu...");
                displayMenu(mainMenu, handleMainMenu);
            }
        });
    } else if (choice === "Each test result") {
        displayOverallResults('geography_results.json', 3, () => {
            console.log("\nReturning to the main menu...");
            displayMenu(mainMenu, handleMainMenu);
        });
    } else if (choice === "Overall results") {
        displayOverallResults('geography_results.json', () => {
            console.log("\nReturning to the main menu...");
            displayMenu(mainMenu, handleMainMenu);
        });
    } else if (choice === "Back") {
        console.log("\nReturning to the main menu...");
        displayMenu(mainMenu, handleMainMenu);
    }
}

// math menu selection
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

// Start
console.log("Welcome to the Education Quiz!");
displayMenu(mainMenu, handleMainMenu);

