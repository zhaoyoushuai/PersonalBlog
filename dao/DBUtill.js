var mysql = require("mysql")

function createConnection(){
    var connection = mysql.createConnection({
        host:"192.168.2.211",
        port:"3306",
        user:"root",
        password:"zys123",
        database:"my_blog"
    })
    return connection
}

module.exports.createConnection = createConnection;