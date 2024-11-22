let users = [];  // Stockage des utilisateurs
let userId = 1;  // ID auto-incrémenté pour les utilisateurs

class User {
    constructor(username, password, role = 'user') {  // Valeur par défaut pour le rôle = 'user'
        this.id = userId++;
        this.username = username;
        this.password = password;  // Garder le mot de passe en clair
        this.role = role;  // Ajout du rôle
    }
}

// Fonction pour créer un utilisateur avec un rôle
const createUser = (username, password, role) => {
    const user = new User(username, password, role);
    users.push(user);
    return user;
};

// Fonction pour récupérer tous les utilisateurs (pour les tests)
const getAllUsers = () => users;

const getUserByUsername = (username) => users.find(user => user.username === username);

module.exports = { createUser, getUserByUsername, getAllUsers };
