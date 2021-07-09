const { empty, notEmpty } = require('../utils/common');
const jwt = require('../utils/jwt');

module.exports = async (request, response, next) => {
    try {
        let access_token = request.headers['x-access-token'];
        if (empty(access_token))
            response.status(401).json({ "code": "INVLD_TKN", "message": "missing token" });
        else if (!jwt.verifyToken(access_token))
            response.status(401).json({ "code": "INVLD_TKN", "message": "invalid token" });
        else next();
    } catch (error) {
        console.error(error);
        response.status(500).json({ "code": "INTRNL_ERR", "message": "internal server error" });
    }
}