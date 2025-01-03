export function generateDailyChallenge() {
    const challenges = [
        { description: "Dokonči 2 testy nad 80 %", reward: 150 },
        { description: "Získej 100 bodů dnes", reward: 100 },
        { description: "Dokonči nový test", reward: 50 }
    ];
    return challenges[Math.floor(Math.random() * challenges.length)];
}