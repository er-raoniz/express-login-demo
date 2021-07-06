const bcrypt = require('bcrypt');
const mysql = require('../services/mysqlService');

module.exports = async function (request, response) {
    try {
        // register user as employee first
        let emp_query = "INSERT INTO `employee` (`emp_id`, `org_name`, `user_id`) VALUES (?, ?, ?);";
        let emp_result = await mysql.executeQuery(emp_query,
            [request.body.emp_id, request.body.org_name, request.body.email_id]);
        console.info(emp_result);

        // register user, if not exists
        try {
            let hash = await bcrypt.hash(request.body.password, env.hashing.salt_rounds);
            let user_query = "INSERT INTO `user` (`email_id`, `first_name`, `last_name`, `pwd_hash`) VALUES (?, ?, ?, ?);";
            let user_result = await mysql.executeQuery(user_query,
                [request.body.email_id, request.body.first_name, request.body.last_name, hash]);
            console.info(user_result);
        } catch (error) {
            if (error.sqlState != "23000" && error.code != "ER_DUP_ENTRY") throw error;
        }

        response.json({ "message": "OK" });
    } catch (error) {
        console.error(error);
        if (error.sqlState == "23000" && error.code == "ER_DUP_ENTRY") {
            response.status(400).json({
                "code": "DUP_EMP_ID",
                "message": "Duplicate employee id"
            });
        } else {
            response.status(500).json({ "message": "Internal server error" });
        }
    }
}