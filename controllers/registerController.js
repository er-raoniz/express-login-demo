const bcrypt = require('bcrypt');
const mysql = require('../services/mysqlService');

module.exports = async function (request, response) {
    try {
        let hash = await bcrypt.hash(request.body.password, env.hashing.salt_rounds);
        let query = "INSERT INTO `user` (`email_id`, `first_name`, `last_name`, `pwd_hash`) VALUES (?, ?, ?, ?);";
            // "INSERT INTO `employee` (`emp_id`, `org_name`, `user_id`) VALUES (?, ?, ?);";
        let params = [request.body.email_id, request.body.first_name, request.body.last_name, hash]
            // request.body.emp_id, request.body.org_name, request.body.email_id];
        let rows = await mysql.executeQuery(query, params);
        console.log(rows);
        response.json(request.body);
    } catch (error) {
        console.error(error);
        response.status(500).send("Internal server error");
    }
}