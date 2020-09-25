const mysql = require('mysql');
const express = require('express');

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

// app.get('/employee', (req, res)=>{
//     mysqlConnection.query('SELECT * FROM employee', (err, rows, filed)=>{
//         if(!err){
//             res.send(rows);
//         } else{
//             console.log(err);
//         }
//     })
// });

// app.get('/employee/:id', (req, res)=>{
//     mysqlConnection.query('SELECT * FROM employee WHERE EmpID = ?',[req.params.id], (err, rows, filed)=>{
//         if(!err){
//             res.send(rows);
//         } else{
//             console.log(err);
//         }
//     })
// });

// app.delete('/employee/:id', (req, res)=>{
//     mysqlConnection.query('DELETE FROM employee WHERE EmpID = ?',[req.params.id], (err, rows, fields)=>{
//         if(!err){
//             res.send('Deleted!');
//         } else{
//             console.log(err);
//         }
//     })
// });

// app.put('/employee', (req, res)=>{
//     let emp = req.body;
//     let sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?;\
//     CALL EmployeeAddOrEdit(@EmpId, @Name, @EmpCode, @Salary);";
//     mysqlConnection.query(sql,[emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, filed)=>{
//         if(!err){
//             res.send('Updated successfully!');
//         } else{
//             console.log(err);
//         }
//     })
// });