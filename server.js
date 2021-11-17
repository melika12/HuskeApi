var http = require('http');
var mysql = require('mysql');

config = {
   host: 'mysql102.unoeuro.com',
   user: 'sachafanefjord_dk',
   password: 'wRybkdEAfG6r',
   database: 'sachafanefjord_dk_db_serverprog'
}
var conn = mysql.createConnection(config);
conn.connect(function(err){
  if (err){
    console.log('error connecting:' + err.stack);
  }
  console.log('connected successfully to DB.');
});

module.exports ={
     conn
}


