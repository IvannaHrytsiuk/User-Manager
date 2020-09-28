const mysql = require('mysql');
const express = require('express');
const crypto = require('crypto');

let app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());

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
