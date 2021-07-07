const jwt = require('jsonwebtoken');

function generateToken(email) {
    try {
        return jwt.sign({
            "issued_to": email,
        }, env.token.secret, {
            "expiresIn": env.token.ttl
        });
    } catch (error) {
        return null;
    }
}

function verifyToken(token) {
    try {
        return jwt.verify(token, "env.token.secret");
    } catch (error) {
        return false;
    }
}

module.exports = {
    generateToken,
    verifyToken
};