var authController = require('../../controllers/authcontroller.js');
var webController = require('../../controllers/webController.js');

module.exports = function(app,passport) {
    console.log("gping herere");
    function isLoggedIn(req, res, next) {
        
           if (req.isAuthenticated())
            
               return next();
                
           res.redirect('/admin/signin');
        
       }
       app.get('/', authController.signin);
    app.get('/admin/signup', authController.signup);
   app.get('/admin/signin', authController.signin);
   app.post('/admin/signup', passport.authenticate('local-signup', {
    successRedirect: '/admin/dashboard',

    failureRedirect: '/admin/signin'
}

));
app.get('/admin/dashboard',authController.dashboard);
app.get('/admin/logout',authController.logout);
app.post('/admin/signin', passport.authenticate('local-signin', {
    successRedirect: '/admin/dashboard',

    failureRedirect: '/admin/signin',
   
}

));

app.get('/admin/createweb',webController.createWeb);
app.post('/admin/createweb',webController.createWeb);
app.get('/admin/listweb',webController.listWeb);



}