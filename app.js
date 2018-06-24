// Module dependencies.
var application_root = __dirname,
    express = require( 'express' ),
    vhost = require( 'vhost' );

function createVirtualHost(domainName, dirPath) {
    return vhost(domainName, express.static( dirPath ));
}

//Create server
var app = express();

//Create the virtual hosts
var naukriHost = createVirtualHost("www.naukrilink.com", application_root + "/views/test.com");
//var tomatoHost = createVirtualHost("www.tomato.com", "tomato");
console.log(application_root + "/views/test.com");
//Use the virtual hosts
app.use(naukriHost);
//app.use(tomatoHost);

//Start server
var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080;
app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});