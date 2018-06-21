var copydir = require('copy-dir');
var path = require('path');
var webMaster = require('../models/index').webmaster;

var createWeb = function(req,res)
{console.log(req.user.id);
    if(req.method == "POST")
      {
    var source = path.join(__dirname, '../views/template/real');
    console.log(source);
    var dest = path.join(__dirname, '../views/'+req.body.webname);
    console.log(dest);
    copydir(source, dest, function(err){
        if(err){
          console.log(err);
        } else {
          console.log(req.user);
          webMaster.create({
            web_name: req.body.webname,
            user_id: req.user.id
          });
          console.log('ok');
        }
      });
    
}
res.render("admin/createweb",{email : req.user.email});
}

var listWeb = function(req,res){
  webMaster.findAll({raw: true,where :{user_id : req.user.id}}).then(webList => {
    console.log(webList)
    res.render("admin/listweb",{data : webList});
  })


}

module.exports.createWeb = createWeb;
module.exports.listWeb = listWeb;