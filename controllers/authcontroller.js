var exports = module.exports = {}

exports.signup = function(req, res) {

   res.render('admin/signup');

}

exports.signin = function(req, res) {
    
       res.render('admin/signin',{layout: false});
    
}

exports.dashboard = function(req, res) {
    
       res.render('admin/dashboard');
    
   }

   exports.logout = function(req, res) {
    
       req.session.destroy(function(err) {
    
           res.redirect('/admin/signin');
    
       });
    
   }