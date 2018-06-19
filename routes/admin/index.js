var authController = require('../../controllers/authcontroller.js');
var webController = require('../../controllers/webController.js');

module.exports = function(app,passport) {
    function isLoggedIn(req, res, next) {
        
           if (req.isAuthenticated())
            
               return next();
                
           res.redirect('/admin/signin');
        
       }
    app.get('/admin/signup', authController.signup);
   app.get('/admin/signin', authController.signin);
   app.post('/admin/signup', passport.authenticate('local-signup', {
    successRedirect: '/admin/dashboard',

    failureRedirect: '/admin/signin'
}

));
app.get('/admin/dashboard',isLoggedIn,authController.dashboard);
app.get('/admin/logout',authController.logout);
app.post('/admin/signin', passport.authenticate('local-signin', {
    successRedirect: '/admin/dashboard',

    failureRedirect: '/admin/signin'
}

));

app.get('/admin/createweb',isLoggedIn,webController.createWeb);


}