const prompt = require('prompt-sync')(); // You need to install prompt-sync in your Node.js environment

// List of European countries with their capitals and additional cities
const historyesAndCities = [
    { history: "Kdo byl prvním Přemyslovcem, kterého řadíme mezi takzvané poslední", deje: "Přemysl Otakar I", cities: ["Spytihněv"] },
    { history: "Který titul chtěl získat Přemysl Otakar II", deje: "římsko-německý král", cities: ["anglický císař"] },
    { history: "Ve kterém roce začal vládnout Přemysl Otakar I", deje: "12", cities: ["17"] },
    { history: "V jakém přibuzemském vztahu byl Ota Braniborský k Václavu II", deje: "bratranec", cities: ["děd"] },
    { history: "Ve které bitvě v roce 1278 padl Přemysl Otakar II", deje: "na Moravském poli", cities: ["u Lipna"] },
    { history: "Které mince se začaly razit za krále Václava II", deje: "groše", cities: ["halíře"] },
    { history: "V kterém městě zemřel Václav III", deje: "Olomouc", cities: ["Karlovy Vary"] },
    { history: "Který vzacný kov se těžil v Kutné Hoře na konci 13.století", deje: "stříbro", cities: ["bronz"] },
    { history: "V kterém roce byl zavražděn Václav III", deje: "1306", cities: ["1510"] },
    { history: "Který panovník vydal horní zákoník", deje: "Václav II", cities: ["Svatopluk"] },
    { history: "Jak dlouho vládl Vaclav III", deje: "jeden rok", cities: ["15 let"] },
    { history: "Který císař vydal Zlatou bulu sicilskou", deje: "Fridrich II", cities: ["Rudolf II"] },
    { history: "Byla Praha za vlády Karla IV. největším městem střední Evropy", deje: "ano", cities: ["ne"] },
    { history: "Kdo byl jeho otec", deje: "Jan Lucemburský", cities: ["Zikmund Lucemburský"] },
    { history: "Jak se říkalo Karlovi IV.", deje: "Otec vlasti", cities: ["Mist meče"] },
    { history: "Kolik měl manželek", deje: "4", cities: ["2"] },
    { history: "Kdo vládl před Karlem IV.", deje: "Jan Lucemburský", cities: ["Bořivoj"] },
    { history: "Co nechal postavit Karel IV. v Praze během hladomoru", deje: "Hladovou zeď", cities: ["Chlebové sádky"] },
    { history: "Co nechal Karel IV. postavit", deje: "katedrála sv. Víta", cities: ["katedrála sv. Mořice"] },
    { history: "Jak se jmenuje uneverzita založena Karlem IV.", deje: "Karlova", cities: ["Pražská"] },
    { history: "K čemu slouží svatováclavská koruna vyrobená na přání Karla IV.?", deje: "ke korunovaci", cities: ["ke každodennímu nošení"] },
    { history: "Povedlo se mu v českých zemích vydat zákoník", deje: "ne", cities: ["ano"] },
    { history: "Byl za života svého otce jeho spoluvládcem", deje: "ano", cities: ["ne"] },
    { history: "Kolik kolejí měla Karlova univerzita při svém založení", deje: "4", cities: ["2"] },
    { history: "Zemřel Karel IV. v bitvě", deje: "ne", cities: ["ano"] },

];

// Function to generate a random question
function generateHistoryDejeQuestion() {
    // Pick a random country
    const randomIndex = Math.floor(Math.random() * historyesAndCities.length);
    const selectedHistory = historyesAndCities[randomIndex];

    // Gather options: Correct capital and three other cities from the same country
    const options = [selectedHistory.deje, ...selectedHistory.cities ];
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
    const correctAnswerIndex = shuffledOptions.indexOf(selectedHistory.deje) + 1; // Add 1 for 1-based numbering

    // Generate the question
    const question = `otázka: ${selectedHistory.history}?`;
    // const question = `Který císař vydal Zlatou bulu sicilskou ${selectedQuestion.hisory1}?`;

    return {
        question,
        options: shuffledOptions,
        correctAnswerIndex,
    };
}

// Function to ask the user for an answer
function askQuestion() {
    const example = generateHistoryDejeQuestion();
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