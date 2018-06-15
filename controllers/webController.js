var copydir = require('copy-dir');
var path = require('path');

var createWeb = function(req,res)
{ 
    var source = path.join(__dirname, '../views/template/real');
    var dest = path.join(__dirname, '../views/'+req.body.webname);
    console.log(dest);
    copydir(source, dest, function(err){
        if(err){
          console.log(err);
        } else {
          console.log('ok');
        }
      });
    
}

module.exports = createWeb;