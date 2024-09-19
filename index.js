const express = require('express');
const MysqlConnection = require('./MysqlConnection')
const app = express()

app.get('/', function (req, res) {
    const mysqlConnection = new MysqlConnection('localhost', 'root', 'root', 'escolas');
    mysqlConnection.connect().query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
    });
    connection.end();
})
app.listen(3000, () => {
    console.log("Rodando o servidor localhost:3000")
});

