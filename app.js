// Module dependencies.
var application_root = __dirname,
    express = require( 'express' ),
    vhost = require( 'vhost' );

function createVirtualHost(domainName, dirPath) {
    return vhost(domainName, express.static( dirPath ));
}

//Create server
var app = express();
const admin = require('./manager/app')
//Create the virtual hosts
var naukriHost = createVirtualHost("www.example.com", application_root + "/public/websites/test.com");
var manager = vhost("admin.example.com", admin);
//var tomatoHost = createVirtualHost("www.tomato.com", "tomato");
console.log(application_root + "/views/test.com");
//Use the virtual hosts
app.use(naukriHost);
app.use(manager);

//Start server
var port = process.env.PORT || 80;
app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});