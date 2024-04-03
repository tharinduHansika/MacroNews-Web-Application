// middleware/validateToken.js
const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Token not provided' });
    }

    jwt.verify(token.split(' ')[1], 'njend293293wsjndIwi09@', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized - Invalid token' });
        }
        req.user = decoded;
        next();
    });
};

module.exports = validateToken;
