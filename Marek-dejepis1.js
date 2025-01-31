const prompt = require('prompt-sync')(); // You need to install prompt-sync in your Node.js environment

// List of European countries with their capitals and additional cities
const waresAndWorld = [
    { war: "Kdy začala 1. světová válka", first: "1914", world: ["1970"] },
    { war: "Během 1.světové války se poprvé objevily tanky", first: "pravda", world: ["nepravda"] },
    { war: "Který stát během 1. světové války změnil stranu, když přešel od spojenectví s Německem k dohodě", first: "Italie", world: ["Francie"] },
    { war: "Kdo byl spojencem Francie v 1. světové válce", first: "USA", world: ["Rakousko-Uhersko"] },
    { war: "Co je to zákop", first: "vojenská obranná stavba, systém jam v zemi", world: ["způsob vykopnutí granátu ze vzducholodě"] },
    { war: "Kdo byl Ferdinand d´Este", first: "následník rakousko-uherského trůnu", world: ["velitel osmaských vojsk"] },
    { war: "Kdo byl spojencem Velké Británie v 1. světové válce", first: "Francie", world: ["Rakousko-Uhersko"] },
    { war: "1. světová válka se také říka Velká válka", first: "pravda", world: ["nepravda"] },
    { war: "Kdy probíhala 1. světová válka", first: "1914-1918", world: ["1814-1818"] },
    { war: "Rakousko-Uhersko vyhrálo 1. světovou válku", first: "nepravda", world: ["pravda"] },
    { war: "V Rusku se v důsledku 1. světové války", first: "dostali k moci komunisté", world: ["výrazně rozvinul průmysl a zemědělství"] },
    { war: "Itálie během 1. světové války", first: "změnilo stranu", world: ["ještě neexistovala"] },
    { war: "Který stát vystoupil z 1. světové války rok před jejím koncem", first: "Rusko", world: ["Francie"] },
    { war: "Které státy byly mezi poraženými", first: "Německo, Rakousko-Uhersko", world: ["Velké Británie, Francie"] },
    { war: "Co bylo jedním z důsledku 1. světové války", first: "vzik nových států, např. Československo", world: ["bližší spolupráce Velké Britanie a Rusko"] },
    { war: "Kdo vyhrál 1. světovou válku", first: "Velká Britannie", world: ["Rakousko-Uhersko"] },
    { war: "Jak říkame nepohyblivé válce s využitím děr v zemi", first: "zákopová válka", world: ["jámová válka"] },
    { war: "Který stát vznikl na konci 1. světové války", first: "Československo", world: ["Švédsko"] },



];

// Function to generate a random question
function generateWarFirstQuestion() {
    // Pick a random country
    const randomIndex = Math.floor(Math.random() * waresAndWorld.length);
    const selectedWar = waresAndWorld[randomIndex];

    // Gather options: Correct capital and three other cities from the same country
    const options = [selectedWar.first, ...selectedWar.world ];

    // Shuffle options
    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
        }
        return arr;
    }

// In your `generateCapitalCityQuestion` function, replace the shuffle line:
    const shuffledOptions = shuffleArray(options);

    // Find the correct answer's number
    const correctAnswerIndex = shuffledOptions.indexOf(selectedWar.first) + 1; // Add 1 for 1-based numbering

    // Generate the question
    const question = `otázka: ${selectedWar.war}?`;


    return {
        question,
        options: shuffledOptions,
        correctAnswerIndex,
    };
}

// Function to ask the user for an answer
function askQuestion() {
    const example = generateWarFirstQuestion();
    console.log(example.question);

    example.options.forEach((option, index) => {
        console.log(`Volba ${index + 1}: ${option}`);
    });

    let userAnswer = prompt('Vyber prosím správnou odpověď (1-2): ');

    while (isNaN(userAnswer) || userAnswer < 1 || userAnswer > 2) {
        userAnswer = prompt('Neplatná volba. Vyberte platnou možnost (1-2): ');
    }

    const result = checkAnswer(userAnswer, example.correctAnswerIndex);
    console.log(result);

    const playAgain = prompt('Chceš si znovu zahrát? (y/n): ').toLowerCase();
    if (playAgain === 'y') {
        askQuestion(); // Call the function recursively to start the next question
    } else {
        console.log('Díky za hru!');
    }
}

// Function to check if the user's answer is correct
function checkAnswer(userAnswer, correctAnswerIndex) {
    if (parseInt(userAnswer) === correctAnswerIndex) {
        return 'Spravně!';
    } else {
        return `Nesprávný! Spravná odpověď byla volba ${correctAnswerIndex}.`;
    }
}

// Start the quiz
askQuestion();