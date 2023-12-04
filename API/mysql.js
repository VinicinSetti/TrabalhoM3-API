const mysql = require('mysql2');


var pool = mysql.createPool({
    "user" : "root",
    "password" : "123456",
    "database" : "concessionaria",
    "host" : "localhost",
    "port" : 5505
});

module.exports.pool = pool;