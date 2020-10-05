var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())
 
require('./app/router/router.js')(app);
 
const db = require('./app/config/db.config.js');
 
const Role = db.role; 
 
var server = app.listen(8080, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port)
})
 
 
function initial(){
  Role.create({
    id: 1,
    name: "USER"
  });
  
  Role.create({
    id: 2,
    name: "ADMIN"
  });
}
const mysql = require('mysql2');

const mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123qaz',
    database:'testdb',
    multipleStatements:true
});

mysqlConnection.connect( function(error){
    if (error) throw error;
    console.log('Connected');
});

app.get('/users', (req, res)=>{
  mysqlConnection.query('SELECT u.* FROM users u left join user_roles ur on u.id = ur.userId where ur.roleId = 1;', (err, rows, filed)=>{
      if(!err){
          res.send(rows);
      } else{
          console.log(err);
      }
  })
});

app.get('/users/:id', (req, res)=>{
  mysqlConnection.query('SELECT * FROM users WHERE id = ?',[req.params.id], (err, rows, filed)=>{
      if(!err){
          res.send(rows);
      } else{
          console.log(err);
      }
  })
});

app.delete('/users/:id', (req, res)=>{
  mysqlConnection.query('DELETE FROM users WHERE id = ?',[req.params.id], (err, rows, fields)=>{
      if(!err){
          res.send('Deleted!');
      } else{
          console.log(err);
      }
  })
});