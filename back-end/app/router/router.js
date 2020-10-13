const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');
const env = require('../config/env');
const db = require('../config/db.config');
 
module.exports = function(app) {
 
    const controller = require('../controller/controller.js');

    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*"); 
      res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
      next();
    });

  app.post('/api/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], controller.signup);
  
  app.post('/api/auth/signin', controller.signin);
  
  app.get('/api/test/user', [authJwt.verifyToken], controller.userContent);
    
  app.get('/api/test/admin', [authJwt.verifyToken], controller.adminBoard);

}