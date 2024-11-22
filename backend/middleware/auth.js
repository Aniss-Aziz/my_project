// backend/middleware/auth.js

const jwt = require('jwt-simple');
const secretKey = 'superSecretKey';  // Clé secrète pour signer le JWT

// Middleware pour vérifier le token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send('Token is required');
  }

  try {
    const decoded = jwt.decode(token, secretKey);
    req.user = decoded;  // Attacher les informations de l'utilisateur
    next();
  } catch (error) {
    return res.status(403).send('Invalid or expired token');
  }
};

module.exports = { verifyToken };
