var http = require('http');
var mysql = require('mysql');

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "school-socialert"
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