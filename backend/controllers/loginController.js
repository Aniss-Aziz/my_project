const userModel = require('../models/user');
const jwt = require('jwt-simple');
const secretKey = 'superSecretKey';  // Clé secrète pour signer le JWT

// Fonction pour le login de l'utilisateur
const login = (req, res) => {
    const { username, password } = req.body;

    // Chercher l'utilisateur dans la base de données
    const user = userModel.getUserByUsername(username);
    if (!user) {
        return res.status(400).send('Utilisateur non trouvé');
    }

    // Comparer le mot de passe directement (en clair, sans hachage)
    if (user.password !== password) {
        return res.status(400).send('Mot de passe incorrect');
    }

    // Créer un token JWT
    const payload = {
        id: user.id,
        username: user.username,
        role: user.role
    };
    
    const token = jwt.encode(payload, secretKey);

    // Retourner le token au client
    return res.status(200).json({
        message: 'Connexion réussie',
        token: token,
        user: {
            id: user.id,
            username: user.username,
            role: user.role
        }
    });
};

module.exports = { login };
