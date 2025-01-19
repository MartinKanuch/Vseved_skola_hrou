
import promptSync from 'prompt-sync';

const prompt = promptSync();

let tasks = [];

// Funkce pro zobrazení menu
function displayMenu(menuOptions, callback) {
    console.log("\nMenu:");
    menuOptions.forEach((option, index) => {
        console.log(`${index + 1}. ${option}`);
    });
    const choice = parseInt(prompt("Zvolte možnost podle čísla: "));
    if (choice > 0 && choice <= menuOptions.length) {
        callback(menuOptions[choice - 1]);
    } else {
        console.log("Neplatná volba, zkuste to znovu.");
        displayMenu(menuOptions, callback);
    }
}

// Zpracování výběru z hlavního menu
function handleMainMenu(option) {
    if (option === "Matematika") {
        console.log("\nVybrali jste Matematiku.");
        const mathMenu = ["Matematický test 1", "Matematický test 2", "Zpět"];
        displayMenu(mathMenu, handleMathMenu);
    } else if (option === "Zeměpis") {
        console.log("\nVybrali jste Zeměpis.");
        loadGeographyTest();
    } else if (option === "Ukončit") {
        console.log("Ukončuji aplikaci. Nashledanou!");
        process.exit();
    }
}

// Zpracování výběru z matematického menu
function handleMathMenu(option) {
    if (option === "Matematický test 1") {
        console.log("Spouštím Matematický test 1...");
        // Nevím, jak načíst otázky..
    } else if (option === "Matematický test 2") {
        console.log("Spouštím Matematický test 2...");

    } else if (option === "Zpět") {
        displayMenu(mainMenu, handleMainMenu);
    }
}

// Načtení testu ze zeměpisu - jak ho načtem?


// Zobrazení testu ze zeměpisu
function displayGeographyTest(questions) {
    console.log("\nZeměpisný test:");
    questions.forEach((question, index) => {
        console.log(`${index + 1}. ${question.text}`);
    });
    console.log("\nTest dokončen. Návrat do hlavního menu...");
    displayMenu(mainMenu, handleMainMenu);
}

// Hlavní menu
const mainMenu = ["Matematika", "Zeměpis", "Ukončit"];

// Spuštění programu
console.log("Vítejte ve vzdělávacím kvízu!");
displayMenu(mainMenu, handleMainMenu);





// Pokus o napojení na matematiku :-)



function startQuiz(callback) { // Add callback as a parameter
    let continueQuiz = true;

    // Object to keep track of results
    const results = {
        correct: 0,
        wrong: 0,
        incrementCorrect() {
            this.correct++;
        },
        incrementWrong() {
            this.wrong++;
        },
        getSummary() {
            return { correct: this.correct, wrong: this.wrong };
        }
    };

    while (continueQuiz) {
        console.log('\nStarting a new set of questions...\n');

        const examples = generateMathExamples(5); // Generuje příklady

        examples.forEach((example, index) => {
            const { question, answer } = example;
            const userInput = prompt(`Example ${index + 1}: ${question}`);
            const userAnswer = parseFloat(userInput);

            if (userAnswer === answer) {
                console.log('Correct!');
                results.incrementCorrect();
            } else {
                console.log(`Wrong! The correct answer is ${answer}`);
                results.incrementWrong();
            }
            console.log('');
        });

        // Zapíše výsledky do results.json
        const resultsSummary = results.getSummary();
        fs.writeFileSync('result.json', JSON.stringify(resultsSummary, null, 2), 'utf8');
        console.log('Results have been saved to results.json.');

        // Ask if the user wants to continue
        const userChoice = prompt('Do you want to continue? (yes/no): ').toLowerCase();
        continueQuiz = userChoice === 'yes' || userChoice === 'y';
    }

    console.log('\nReturning to main menu...\n');
    if (callback) callback(); // návrat do hlavního menu
}

// Example function to generate math examples
function generateMathExamples(count) {
    const examples = [];
    for (let i = 0; i < count; i++) {
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        examples.push({
            question: `${num1} + ${num2} = `,
            answer: num1 + num2
        });
    }
    return examples;
}

// Export the function for external use
module.exports.startQuiz = startQuiz;



