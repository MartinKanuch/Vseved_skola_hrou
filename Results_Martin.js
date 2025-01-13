// Initialize counters
let correctCount = 0;
let wrongCount = 0;

// Function to increment correct answers
function incrementCorrect() {
    correctCount++;
}

// Function to increment wrong answers
function incrementWrong() {
    wrongCount++;
}

// Function to get current results
function getResults() {
    return { correctCount, wrongCount };
}

// Function to calculate percentage
function calculatePercentage(total, count) {
    return total === 0 ? 0 : ((count / total) * 100).toFixed(2);
}

// Function to generate a bar chart for results
function generateBarChart(correct, wrong) {
    const total = correct + wrong;
    const correctBar = '█'.repeat(correct);
    const wrongBar = '█'.repeat(wrong);
    const percentageCorrect = calculatePercentage(total, correct);
    const percentageWrong = calculatePercentage(total, wrong);

    console.log('\nResults Summary:');
    console.log(`Correct Answers: ${correct} (${percentageCorrect}%)`);
    console.log(`Wrong Answers: ${wrong} (${percentageWrong}%)\n`);
    console.log(`Graphical Representation:`);
    console.log(`[Correct] ${correctBar}`);
    console.log(`[Wrong  ] ${wrongBar}`);
}

// Function to display current results
function displayResults() {
    const { correctCount, wrongCount } = getResults();
    console.log(`\nResults so far: ${correctCount} correct, ${wrongCount} wrong.`);

}

// Function to display final results
function displayFinalResults() {
    const { correctCount, wrongCount } = getResults();
    console.log(`\nFinal Results:`);
    generateBarChart(correctCount, wrongCount);
}

module.exports = {
    incrementCorrect,
    incrementWrong,
    getResults,
    displayResults,
    displayFinalResults,
};
// Display final results in results.js
// results.displayFinalResults();

// Display current results
// results.displayResults();