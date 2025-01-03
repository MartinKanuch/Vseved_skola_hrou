export function displayLeaderboard(users) {
    users.sort((a, b) => b.points - a.points);
    console.log("🏆 Leaderboard:");
    users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.nickname} - ${user.points} bodů (Úroveň: ${user.level})`);
    });
}