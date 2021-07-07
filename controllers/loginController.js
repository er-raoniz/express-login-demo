const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');
const mysql = require('../services/mysqlService');

module.exports = async function (request, response) {
    try {
        let query = "SELECT * from `user` WHERE `email_id` = ?";
        let user_data = await mysql.executeQuery(query, [request.body.email_id]);

        if (await bcrypt.compare(request.body.password, user_data[0].pwd_hash)) {
            let token = jwt.generateToken(request.body.email_id);
            response.json({ "code": "OK", "message": "user logged in", "token": token });
        } else {
            response.status(401).json({ "code": "INVLD_PWD", "message": "wrong password" })
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ "code": "INTRNL_ERR", "message": "internal server error" });
    }
}