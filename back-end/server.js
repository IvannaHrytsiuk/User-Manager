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
