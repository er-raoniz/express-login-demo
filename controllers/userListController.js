const { notEmpty } = require('../utils/common');
const mysql = require('../services/mysqlService');

module.exports = async function (request, response) {
    try {
        let query = "SELECT `first_name`, " +
            "`last_name`, " +
            "`email_id`, " +
            "`emp_id`, " +
            "`org_name`" +
            "FROM `user` JOIN `employee` ON `email_id` = `user_id`";
        let params = [];

        // for search
        let search_query = [];
        ['first_name', 'last_name', 'emp_id'].forEach(element => {
            if (notEmpty(request.query[element])) {
                search_query.push(`\`${element}\` LIKE ?`);
                params.push(`%${request.query[element]}%`);
            }
        });
        if (search_query.length > 0) {
            query += " WHERE " + search_query.join(" AND ");
        }

        // for sort
        if (notEmpty(request.query.sort_by)) {
            query += ` ORDER BY ${request.query.sort_by}`;
            if (notEmpty(request.query.order))
                query += ` ${request.query.order.toUpperCase()}`;
        }

        // for pagination
        if (notEmpty(request.query.limit)) {
            query += " LIMIT ?";
            params.push(request.query.limit);
            if (notEmpty(request.query.page)) {
                let offset = request.query.limit * (request.query.page - 1);
                query += " OFFSET ?";
                params.push(offset);
            }
        }

        let rows = await mysql.executeQuery(query, params);
        if (rows.length > 0) response.json(rows);
        else response.status(204).send();
    } catch (error) {
        console.error(error);
        response.status(500).json({ "code": "INTRNL_ERR", "message": "internal server error" });
    }
}