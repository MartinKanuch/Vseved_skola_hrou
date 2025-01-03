import { registerUser } from './registerUser.js';
import { displayLeaderboard } from './leaderboard.js';
import { generateDailyChallenge } from './dailyChallenges.js';


let users = [];


const andrej = registerUser(users, "Andrej", "andrej@example.com", "Donald", "test_avatar.png");
const jana = registerUser(users, "Jana", "jana@example.com", "Jane", "avatar_jane.png");
const boris = registerUser(users, "Boris", "boris@example.com", "Bory", "boris_avatar.png");


users.forEach(user => user.claimDailyBonus());


users.forEach(user => {
    const challenge = generateDailyChallenge();
    user.assignDailyChallenge(challenge.description, challenge.reward);
});


if (andrej) {
    andrej.addTestResult("Matematika - Úroveň 1", 85);
    andrej.addPoints(120);
    andrej.checkLevelUp();
}

if (jana) {
    jana.addTestResult("Fyzika - Úroveň 1", 92);
    jana.addPoints(50);
    jana.checkLevelUp();
}

if (boris) {
    boris.addTestResult("Chemie - Úroveň 3", 78);
    boris.addPoints(90);
    boris.checkLevelUp();
}


console.log("\nProfily uživatelů:");
users.forEach(user => {
    user.displayProfile();
    console.log(`📊 Nejvyšší skóre: ${user.getHighestScore()}%`);
    console.log(`📊 Průměrná úspěšnost: ${user.getAverageScore()}%`);
    console.log(`⏳ Zbývá do další úrovně: ${user.getProgressToNextLevel()} bodů`);
});


console.log("\n🏆 Leaderboard:");
displayLeaderboard(users);