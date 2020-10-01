const mysql = require('mysql');
const express = require('express');
const crypto = require('crypto');

let app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


const mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123qaz',
    database:'user-manager',
    multipleStatements:true
});

mysqlConnection.connect( function(error){
    if (error) throw error;
    console.log('Connected');
});

app.listen(3000);

app.get('/users', (req, res)=>{
    mysqlConnection.query('SELECT * FROM users', (err, rows, filed)=>{
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
// app.put('/users', (req, res)=>{
//     let user = req.body;
//     let sql = "SET @id = ?;SET @name = ?;SET @email = ?;SET @password = ?; SET @created_at = ?; SET @updated_at = ?\
//     CALL UserAddOrEdit(@id, @name, @email, @password, @created_at, @updated_at);";
//     mysqlConnection.query(sql,[user.id, user.name, user.email, user.password, user.created_at, user.updated_at], (err, rows, filed)=>{
//         if(!err){
//             res.send('Updated successfully!');
//         } else{
//             console.log(err);
//         }
//     })
// });
app.post('/users', (req, res) => {
    let user = req.body;
    var sql = "INSERT INTO `users`(name,email, password, created_at, updated_at) VALUES (?,?, ?, NOW(), NOW());";
    mysqlConnection.query(sql, [user.name, user.email, user.password], (err, rows, fields) => {
        if (!err){            
            res.send('New ');
        }
        else{
            console.log(err);
        }
    })
});