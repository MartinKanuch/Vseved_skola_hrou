const prompt = require('prompt-sync')(); // You need to install prompt-sync in your Node.js environment

// List of European countries with their capitals and additional cities
const countriesAndCities = [
    { country: "France", capital: "Paris", cities: ["Lyon", "Marseille", "Nice"] },
    { country: "Německa", capital: "Berlin", cities: ["Munich", "Hamburg", "Frankfurt"] },
    { country: "Italie", capital: "Rome", cities: ["Milan", "Naples", "Turin"] },
    { country: "Španělska", capital: "Madrid", cities: ["Barcelona", "Valencia", "Seville"] },
    { country: "Anglie", capital: "London", cities: ["Manchester", "Birmingham", "Liverpool"] },
    { country: "Holanska", capital: "Amsterdam", cities: ["Rotterdam", "The Hague", "Utrecht"] },
    { country: "Švédska", capital: "Stockholm", cities: ["Gothenburg", "Malmö", "Uppsala"] },
    { country: "Norska", capital: "Oslo", cities: ["Bergen", "Trondheim", "Stavanger"] },
    { country: "Dánska", capital: "Copenhagen", cities: ["Aarhus", "Odense", "Aalborg"] },
    { country: "Polska", capital: "Warsaw", cities: ["Krakow", "Wroclaw", "Gdansk"] },
    { country: "České rebubliky", capital: "Praha", cities: ["Brno", "Ostrava", "Plzeň"] },
];

// Function to generate a random question
function generateCapitalCityQuestion() {
    // Pick a random country
    const randomIndex = Math.floor(Math.random() * countriesAndCities.length);
    const selectedCountry = countriesAndCities[randomIndex];

    // Gather options: Correct capital and three other cities from the same country
    const options = [selectedCountry.capital, ...selectedCountry.cities];

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
    const correctAnswerIndex = shuffledOptions.indexOf(selectedCountry.capital) + 1; // Add 1 for 1-based numbering

    // Generate the question
    const question = `Jaké je hlavní město ${selectedCountry.country}?`;

    return {
        question,
        options: shuffledOptions,
        correctAnswerIndex,
    };
}

// Function to ask the user for an answer
function askQuestion() {
    const example = generateCapitalCityQuestion();
    console.log(example.question);

    example.options.forEach((option, index) => {
        console.log(`Volba ${index + 1}: ${option}`);
    });

    let userAnswer = prompt('Vyber prosím správnou odpověď (1-4): ');

    while (isNaN(userAnswer) || userAnswer < 1 || userAnswer > 4) {
        userAnswer = prompt('Neplatná volba. Vyberte platnou možnost (1-4): ');
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