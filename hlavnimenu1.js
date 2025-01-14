
import promptSync from 'prompt-sync';


const prompt = promptSync();

console.log("Ahoj, vítej v naší vzdělávací aplikaci.");
console.log("S námi se posuneš dále! Zvol si předmět, ročník a pusť se do toho.");

console.log("Dostupné předměty:");
console.log("1. Matematika");
console.log("2. Zeměpis");
const subjectChoice = prompt("Zvol si předmět (1 nebo 2): ");

let subject;
if (subjectChoice === "1") {
    subject = "Matematika";
} else if (subjectChoice === "2") {
    subject = "Zeměpis";
} else {
    console.log("Neplatná volba, prosím spusť program znovu.");
    process.exit();
}

console.log("Dostupné ročníky:");
console.log("1. První ročník");
console.log("2. Druhý ročník");
const gradeChoice = prompt("Zvol si ročník (1 nebo 2): ");

let grade;
if (gradeChoice === "1") {
    grade = "První ročník";
} else if (gradeChoice === "2") {
    grade = "Druhý ročník";
} else {
    console.log("Neplatná volba, prosím spusť program znovu.");
    process.exit();
}

console.log(`Výborně! Vybral sis předmět: ${subject}, úroveň: ${grade}.`);
console.log("Můžeš se pustit do učení! Hodně štěstí.");






