const mysql = require('mysql2');

const mysqlConfig = {
    host: env.mysql.host,
    user: env.mysql.username,
    password: env.mysql.password,
    database: env.mysql.database
}

const pool = mysql.createPool(mysqlConfig);

function connect(cb) {
    return new Promise((resolve, reject) => {
        pool.on('connection', function (connection) {
            connection.on('error', function (err) {
                console.error('MySQL error event', err);
            });
            connection.on('close', function (err) {
                console.warn('MySQL close event', err);
            });
        });
        resolve();
    })
}

async function executeQuery(query, params) {
    console.debug(`query: `, query, params)
    return new Promise((resolve, reject) => {
        try {
            pool.execute(query, params, (e, r, f) => {
                if (e) {
                    reject(e);
                }
                else {
                    resolve(r);
                }
            });
        }
        catch (ex) {
            reject(ex)
        }
    })
}

async function execSP(spName, params) {
    return new Promise((resolve, reject) => {
        try {
            var paramPlaceHolder = ''
            if (params && params.length) {
                for (var i = 0; i < params.length; i++) {
                    paramPlaceHolder += '?,'
                }
            }
            if (paramPlaceHolder.length) {
                paramPlaceHolder = paramPlaceHolder.slice(0, -1);
            }
            console.debug('final SP call', `CALL ${spName}(${params})`);
            pool.query(`CALL ${spName}(${paramPlaceHolder})`, params, (e, r, f) => {
                if (e) {
                    reject(e);
                }
                else {
                    resolve(r);
                }
            });
        }
        catch (ex) {
            reject(ex);
        }
    })
}
module.exports.connect = connect;
module.exports.executeQuery = executeQuery;
module.exports.execSP = execSP;