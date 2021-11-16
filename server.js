var http = require('http');
var mysql = require('mysql');

var conn = mysql.createConnection({
    host: "mysql102.unoeuro.com",
    user: "sachafanefjord_dk",
    password: "wRybkdEAfG6r",
    database: "sachafanefjord_dk_db_serverprog"
});

var server = http.createServer(function(req, res) {
    conn.connect(function(err) {
        conn.query("SELECT * FROM posts", function(err, data) {
            res.write(JSON.stringify(data));
            res.end();
        });
    });
});

server.listen(8080);