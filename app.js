var express = require('express');
var application_root = __dirname;
var vhost = require('vhost');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');


var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'keyboard cat',cookie: { maxAge: 60000 }, resave:false, saveUninitialized: true })); // session secret

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions
//Models
var models = require("./models");
//console.log(models.user);

//Sync Database
models.sequelize.sync().then(function () {

  console.log('Nice! Database looks fine')

}).catch(function (err) {

  console.log(err, "Something went wrong with the Database Update!")

});
//load passport strategies
require('./config/passport/passport.js')(passport, models.user);

function createVirtualHost(domainName, dirPath) {
  console.log(dirPath);
  return vhost(domainName, express.static(dirPath));
}


var index = require('./routes/admin/index')(app, passport);
//var users = require('./routes/users');
// For Passport
var env = require('dotenv').load();


//Create the virtual hosts
var potatoHost = createVirtualHost("www.potato.com", "/views/potato.com");
var tomatoHost = createVirtualHost("www.tomato.com", application_root + "/views/tomato");

//Use the virtual hosts
app.use(potatoHost);
app.use(tomatoHost);
var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080;
var ip = process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '0.0.0.0';
//app.set('port',server_port);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


//app.use('/', index);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(port,ip, function () {

    console.log( "Listening on port " + ip + ", server_port " + port  );

});
module.exports = app;
