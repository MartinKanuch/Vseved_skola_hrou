const prompt = require('prompt-sync')();
const fs = require("fs");

// Menus
const mainMenu = ["Mathematics", "Geography"];
const mathMenu = ["Math Test 1", "Math Test 2"];

// Function to display menu
function displayMenu(options, callback) {
    console.log("\nPlease choose an option:");
    options.forEach((option, index) => {
        console.log(`${index + 1}. ${option}`);
    });
    const choice = parseInt(prompt("Enter your choice: "));
    const selected = options[choice - 1];
    if (selected) {
        callback(selected);
    } else {
        console.log("Invalid choice. Please try again.");
        displayMenu(options, callback);
    }
}
const { startGeographyTest } = require("./geography.js");

function handleMainMenu(option) {
    if (option === "Mathematics") {
        displayMenu(mathMenu, handleMathMenu);
    } else if (option === "Geography") {
        startGeographyTest(1, () => displayMenu(mainMenu, handleMainMenu));
    }
}

// Handle math menu selection
function handleMathMenu(option) {
    if (option === "Math Test 1") {
        const math1 = require("./math1.js");
        math1.startQuiz(() => displayMenu(mainMenu, handleMainMenu));
    } else if (option === "Math Test 2") {
        const math2 = require("./math2.js");
        math2.startQuiz(() => displayMenu(mainMenu, handleMainMenu));
    }
}


console.log("Welcome to the Education Quiz!");
displayMenu(mainMenu, handleMainMenu);