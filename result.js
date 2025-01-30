const fs = require("fs");
const chalk = require("chalk");


// Function to display results of each test
function displayResultsOfEachTest(filePath, callback) {
    if (!fs.existsSync(filePath)) {
        console.log(chalk.yellow(`No results found for ${filePath}.`));
        return;
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(chalk.red("Error reading the file:"), err);
            return;
        }

        let results;
        try {
            results = JSON.parse(data.trim() || '[]');
        } catch (error) {
            console.error(chalk.red("Error parsing JSON data."), error);
            return;
        }

        if (!Array.isArray(results) || results.length === 0) {
            console.log(chalk.yellow("No test results available."));
            return;
        }

        console.log(chalk.blue("\n--- Results of Each Test ---"));
        results.forEach(({ correct, wrong, testNumber, date }) => {
            const total = correct + wrong;
            const percentageCorrect = total === 0 ? 0 : (correct / total) * 100;
            const percentageWrong = total === 0 ? 0 : (wrong / total) * 100;

            const maxBarLength = 20;
            const correctBar = chalk.green("■".repeat(Math.round((correct / total) * maxBarLength)));
            const wrongBar = chalk.red("■".repeat(Math.round((wrong / total) * maxBarLength)));

            console.log(`\n${chalk.cyan(`Test ${testNumber} on ${date}:`)}`);
            console.log(`Correct: ${chalk.green(correct)} (${chalk.green(percentageCorrect.toFixed(2) + '%')})`);
            console.log(`Wrong  : ${chalk.red(wrong)} (${chalk.red(percentageWrong.toFixed(2) + '%')})`);
            console.log(`Graphical Representation:\n[${chalk.green("Correct")}] ${correctBar}\n[${chalk.red("Wrong  ")}] ${wrongBar}`);
        });

        if (callback) callback();
    });
}

// Function to display overall results (summary of all tests)
function displayOverallResults(filePath, callback) {
    if (!fs.existsSync(filePath)) {
        console.log(chalk.yellow(`No results found for ${filePath}.`));
        return;
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(chalk.red("Error reading the file:"), err);
            return;
        }

        let results;
        try {
            results = JSON.parse(data.trim() || '[]');
        } catch (error) {
            console.error(chalk.red("Error parsing JSON data."), error);
            return;
        }

        if (!Array.isArray(results) || results.length === 0) {
            console.log(chalk.yellow("No test results available."));
            return;
        }

        // Overall tests
        const totalCorrect = results.reduce((sum, { correct }) => sum + correct, 0);
        const totalWrong = results.reduce((sum, { wrong }) => sum + wrong, 0);
        const totalAttempts = totalCorrect + totalWrong;
        const totalPercentageCorrect = totalAttempts === 0 ? 0 : (totalCorrect / totalAttempts) * 100;
        const totalPercentageWrong = totalAttempts === 0 ? 0 : (totalWrong / totalAttempts) * 100;

        const maxBarLength = 20;
        const totalCorrectBar = chalk.green("■".repeat(Math.round((totalCorrect / totalAttempts) * maxBarLength)));
        const totalWrongBar = chalk.red("■".repeat(Math.round((totalWrong / totalAttempts) * maxBarLength)));

        console.log(chalk.magenta("\n--- Overall - Summary of All Tests ---"));
        console.log(`Total Correct: ${chalk.green(totalCorrect)} (${chalk.green(totalPercentageCorrect.toFixed(2) + '%')})`);
        console.log(`Total Wrong  : ${chalk.red(totalWrong)} (${chalk.red(totalPercentageWrong.toFixed(2) + '%')})`);
        console.log(`Graphical Representation:\n[${chalk.green("Correct")}] ${totalCorrectBar}\n[${chalk.red("Wrong  ")}] ${totalWrongBar}`);

        if (callback) callback();
    });
}

module.exports = { displayResultsOfEachTest, displayOverallResults };

