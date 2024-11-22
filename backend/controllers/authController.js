const userModel = require('../models/user');  // Le modèle utilisateur

// Fonction pour enregistrer un nouvel utilisateur avec un rôle
const register = (req, res) => {
    const { username, password, role } = req.body;  // Récupérer le rôle depuis le body de la requête

    // Vérifier si un utilisateur avec ce nom existe déjà
    const existingUser = userModel.getUserByUsername(username);
    if (existingUser) {
        return res.status(400).send('Nom d\'utilisateur déjà pris');
    }

    // Créer l'utilisateur sans hacher le mot de passe
    const newUser = userModel.createUser(username, password, role || 'user');  // Rôle par défaut = "user"
    
    // Retourner les données de l'utilisateur sans cryptage du mot de passe
    return res.status(201).json({
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
        password: newUser.password  // Inclure le mot de passe (non haché) dans la réponse (NON recommandé en production)
    });
};

module.exports = { register };
