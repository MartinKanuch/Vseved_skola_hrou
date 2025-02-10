const fs = require("fs");
const chalk = require("chalk");
const prompt = require("prompt-sync")();

const resultFiles = {
    "Geography_badges": "geography_results.json",
    "Math1_badges": "math1.json",
    "Math2_badges": "math2.json",
    "History1_badges": "history1_results.json",
    "History2_badges": "history2_results.json"
};

//  calculate and display badges
function displayBadges(filePath, callback) {
    if (!fs.existsSync(filePath)) {
        console.log(chalk.yellow(`No results found for ${filePath}.`));
        return callback();
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(chalk.red("Error reading the file:"), err);
            return callback();
        }

        let results;
        try {
            results = JSON.parse(data.trim() || '[]');
        } catch (error) {
            console.error(chalk.red("Error parsing JSON data."), error);
            return callback();
        }

        if (!Array.isArray(results) || results.length === 0) {
            console.log(chalk.yellow("No test results available."));
            return callback();
        }

        //  correct answers
        const totalCorrect = results.reduce((sum, { correct }) => sum + correct, 0);
        const totalPoints = Math.floor(totalCorrect / 20);
        const goldenCrowns = Math.floor(totalPoints / 5);

        console.log(chalk.green("\n--- Badges Summary ---"));
        console.log(`Total Correct Answers: ${chalk.blue(totalCorrect)}`);
        console.log(`Total Points: ${chalk.yellow(totalPoints)} (1 point per 20 correct answers)`);
        console.log(`Golden Crowns: ${chalk.magenta(goldenCrowns)} (1 crown for every 5 points)`);

        //  earned badges
        let stars = "⭐".repeat(totalPoints);
        let crowns = "👑".repeat(goldenCrowns);

        if (goldenCrowns > 0) {
            console.log(chalk.magenta(`Golden Crowns: ${crowns}`));
        }

        if (totalPoints > 0) {
            console.log(chalk.yellow(`Points: ${stars}`));
        }

        if (totalPoints === 0) {
            console.log(chalk.red("No badges earned yet. Keep practicing!"));
        }

        callback();
    });
}

//  display badges menu
function displayBadgesMenu(callback) {
    console.log("\nPlease choose an option to view badges or go back:");
    const options = [...Object.keys(resultFiles), "Back"];
    options.forEach((option, index) => {
        console.log(`${index + 1}. ${option}`);
    });
    console.log('');
    let choice;
    while (true) {
        choice = parseInt(prompt("Enter your choice: "));
        if (!isNaN(choice) && choice >= 1 && choice <= options.length) {
            break;
        } else {
            console.log("Invalid choice. Please try again.");
        }
    }

    const selectedOption = options[choice - 1];
    if (selectedOption === "Back") {
        callback();
    } else if (resultFiles[selectedOption]) {
        displayBadges(resultFiles[selectedOption], () => {
            displayBadgesMenu(callback);  // Return to the Badges Menu
        });
    }
}

module.exports = { displayBadgesMenu };
