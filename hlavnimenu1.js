
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
      } else if (option === "Zobrazit výsledky") {
    console.log("\nVybrali jste zobrazit výsledky.");
    displayFinalResults();// Zavolání funkce pro zobrazení výsledků
    } else if (option === "Ukončit") {
        console.log("Ukončuji aplikaci. Nashledanou!");
        process.exit();
    } else {
        console.log("Neplatná volba, zkuste to znovu.");
    }
}


// Funkce pro zpracování výběru z matematického menu
function handleMathMenu(option) {
    if (option === "Matematický test 1") {
        console.log("Spouštím Matematický test 1...");
        const examples = generateMathExamples(5); // Generuje 5 příkladů
        startMathQuiz(examples); // Spustí kvíz s příklady
    } else if (option === "Matematický test 2") {
        console.log("Spouštím Matematický test 2...");
        const examples = generateMathExamples(10); // Generuje 10 příkladů
        startMathQuiz(examples); // Spustí kvíz s příklady
    } else if (option === "Zpět") {
        displayMenu(mainMenu, handleMainMenu);
    }
}

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
const mainMenu = ["Matematika", "Zeměpis", "Zobrazit výsledky", "Ukončit"];

// Spuštění programu
console.log("Vítejte ve vzdělávacím kvízu! Vyber předmět, kterému se chceš věnovat.");
displayMenu(mainMenu, handleMainMenu);







