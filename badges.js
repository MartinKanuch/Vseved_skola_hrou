const badges = [
    {
        name: "Perfekcionista",
        description: "Dokonči test s 100% úspěšností. 🌟",
        condition: (user) => user.history.some(test => test.score === 100),
        unlocked: false
    },
    {
        name: "Maratonec",
        description: "Dokonči 10 testů během jednoho týdne. 🏃",
        condition: (user) => user.history.filter(test => test.completedThisWeek).length >= 10,
        unlocked: false
    },
    {
        name: "Rychlík",
        description: "Odpověz správně na 10 otázek během 1 minuty. 🚀",
        condition: (user) => user.fastAnswers >= 10,
        unlocked: false
    },
    {
        name: "Stabilní úspěch",
        description: "Udrž 5 testů za sebou s úspěšností nad 80 %. 🔥",
        condition: (user) => {
            const recentTests = user.history.slice(-5);
            return recentTests.length === 5 && recentTests.every(test => test.score >= 80);
        },
        unlocked: false
    },
    {
        name: "Denní aktivita",
        description: "Přihlas se 7 dní po sobě. 📅",
        condition: (user) => user.dailyLogins >= 7,
        unlocked: false
    },
    {
        name: "Vytrvalec",
        description: "Dokonči 3 testy bez přestávky během jednoho sezení. ⏱️",
        condition: (user) => user.sessionTests >= 3,
        unlocked: false
    },
    {
        name: "Génius dne",
        description: "Získej nejvyšší skóre na leaderboardu za posledních 24 hodin. 🧠",
        condition: (user, leaderboard) => leaderboard[0]?.username === user.username,
        unlocked: false
    },
    {
        name: "Neúnavný průzkumník",
        description: "Dokonči 5 testů z různých předmětů. 🗺️",
        condition: (user) => {
            const subjects = new Set(user.history.map(test => test.subject));
            return subjects.size >= 5;
        },
        unlocked: false
    },
    {
        name: "Odpovědní maratonec",
        description: "Odpověz na 50 otázek během jednoho testovacího sezení. 🏋️‍♂️",
        condition: (user) => user.history.some(test => test.totalQuestions >= 50),
        unlocked: false
    },
    {
        name: "Znalostní mistr",
        description: "Dosáhni 90% nebo více v 10 testech. 🏅",
        condition: (user) => user.history.filter(test => test.score >= 90).length >= 10,
        unlocked: false
    }
];

export default badges;
