const mysql = require('mysql');

class MysqlConnection {
    constructor(host, username, password, database) {
        this.host = host;
        this.username = username;
        this.password = password;
        this.database = database;
    }
    connect() {
        const connection = mysql.createConnection({
            host: this.host,
            user: this.username,
            password: this.password,
            database: this.database
        });
        return connection.connect();
    }
}

module.exports = MysqlConnection;


