var authController = require('../../controllers/authcontroller.js');

module.exports = function(app) {

   app.get('/admin/signin', authController.signin);

}