const jwt = require('jsonwebtoken');
const tokens = require('./token');

const validateRequest = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: 'Token manquant' });
    }

    jwt.verify(token, tokens.Token.secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token non valide' });
        }

        req.user = user;
        next();
    });
};


module.exports = validateRequest;
