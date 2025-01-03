import User from './user.js';

export function registerUser(users, username, email, nickname, avatar) {

    if (users.some(user => user.email === email)) {
        console.log("Chyba: Tento e-mail je již registrován.");
        return null;
    }

    if (users.some(user => user.nickname === nickname)) {
        console.log("Chyba: Tato přezdívka je již použita. Zkuste jinou.");
        return null;
    }

    const newUser = new User(username, email, nickname, avatar);
    users.push(newUser);
    console.log(`Registrace úspěšná. Vítejte, ${nickname}!`);
    return newUser;
}