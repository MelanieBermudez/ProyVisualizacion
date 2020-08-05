const mysql = require('mysql')
    //conexion a la bd 

var mysqlconnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'netflix_db'
});

const db = {}
db.mysqlConnection = mysqlconnection
module.exports = db