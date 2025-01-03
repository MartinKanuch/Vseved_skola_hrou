export default class User {
    constructor(username, email, nickname, avatar = "default_avatar.png") {
        this.username = username; // Jméno uživatele
        this.email = email; // E-mail uživatele
        this.nickname = nickname; // Přezdívka uživatele
        this.avatar = avatar; // Avatar uživatele
        this.points = 0; // Počáteční body
        this.level = 1; // Počáteční úroveň
        this.history = []; // Historie testů
        this.dailyChallenge = null; // Denní výzva
    }

    displayProfile() {
        console.log("=".repeat(30));
        console.log(`👤 Uživatel: ${this.username}`);
        console.log(`📧 Email: ${this.email}`);
        console.log(`🎮 Přezdívka: ${this.nickname}`);
        console.log(`🖼️ Avatar: ${this.avatar}`);
        console.log(`✨ Body: ${this.points}`);
        console.log(`🔝 Úroveň: ${this.level}`);
        console.log("=".repeat(30));
    }

    addPoints(points) {
        this.points += points;
        console.log(`${this.nickname} získal ${points} bodů. Celkem: ${this.points}`);
    }

    checkLevelUp() {
        const nextLevelThreshold = this.level * 100; // Body potřebné pro další úroveň
        if (this.points >= nextLevelThreshold) {
            this.level += 1;
            console.log(`🎉 Gratulujeme! ${this.nickname} postoupil na úroveň ${this.level}.`);

            // Odměna za dosažení nové úrovně
            const rewardPoints = 50; // Extra body za postup
            this.points += rewardPoints;
            console.log(`🎁 Bonus za úroveň: Získáváš ${rewardPoints} bodů!`);
        }
    }

    addTestResult(testName, score) {
        this.history.push({ testName, score });
        console.log(`📚 Test "${testName}" dokončen s výsledkem ${score}%.`);
    }

    displayHistory() {
        console.log("📜 Historie testů:");
        if (this.history.length === 0) {
            console.log("Žádné testy zatím nebyly dokončeny.");
            return;
        }
        this.history.forEach((test, index) => {
            console.log(`${index + 1}. Test: ${test.testName}, Výsledek: ${test.score}%`);
        });
        console.log("=".repeat(30));
    }

    getProgressToNextLevel() {
        const nextLevelThreshold = this.level * 100;
        const pointsNeeded = nextLevelThreshold - this.points;
        return pointsNeeded > 0 ? pointsNeeded : 0; // Kolik bodů zbývá
    }

    claimDailyBonus() {
        const dailyBonus = 20; // Denní bonus bodů
        this.points += dailyBonus;
        console.log(`🎁 Denní bonus připsán! Získal jsi ${dailyBonus} bodů.`);
    }

    getHighestScore() {
        if (this.history.length === 0) return null;
        return Math.max(...this.history.map(test => test.score));
    }

    getAverageScore() {
        if (this.history.length === 0) return null;
        const totalScore = this.history.reduce((sum, test) => sum + test.score, 0);
        return (totalScore / this.history.length).toFixed(2); // Průměr na 2 desetinná místa
    }

    assignDailyChallenge(description, reward) {
        this.dailyChallenge = { description, reward, isCompleted: false };
        console.log(`📅 Nová denní výzva: "${description}" - Odměna: ${reward} bodů`);
    }
}