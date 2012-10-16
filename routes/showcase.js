var Models = require('../models');
var requireLogin = require('./help').requireLogin;

module.exports = function(app){
    // lists of all public
    app.get('/api/showcases/public', function(req, res){
        return Models.Showcase.find({publiced:true},function( err, showcases){
            if(!err){
                return res.send(showcases);
            } else {
                return console.log(err);
            }
        });
    });

    // list just mine
    app.get('/api/showcases', requireLogin,function(req, res){
        return Models.Showcase.find({author_id:req.cookies.username},function( err, showcases){
            if(!err){
                return res.send(showcases);
            } else {
                return console.log(err);
            }
        });
    });

    // create new
    app.post('/api/showcases', requireLogin, function(req, res){
        var showcase;
        console.log("POST: ");
        console.log(req.body);
        showcase = new Models.Showcase({
            title: req.body.title,
            description: req.body.description,
            cover: req.body.cover,
            cakes: req.body.cakes,
            publiced: req.body.publiced,
            author_id: req.body.author_id
        });
        showcase.save(function( err){
            if(!err){

                return res.send('created');
            } else {
                return console.log(err);
            }
        });
        return res.send(showcase);
    });

    //get info
    app.get('/api/showcases/:id', function(req,res){
        return Models.Showcase.findById( req.params.id, function(err, showcase){
            if(!err){
                return res.send(showcase);
            } else {
                return console.log(err);
            }
        });
    });

    // update
    app.put('/api/showcases/:id', function(req, res){
        console.log(req.params.id);
        console.log(req.params);
        return Models.Showcase.findById(req.params.id, function(err, showcase){
            showcase.title = req.body.title;
            showcase.description = req.body.description;
            showcase.cover = req.body.cover;
            showcase.cakes= req.body.cakes;
            showcase.publiced= req.body.publiced;

            return showcase.save(function(err){
                if (!err){
                    console.log('updated');
                } else {
                    console.log(err);
                }
                return res.send(showcase);
            });
        });
    });

    // delete id
    app.delete('/api/showcases/:id',requireLogin,function(req,res){
        return Models.Showcase.findById( req.params.id, function(err, showcase){
            if(showcase.author_id != req.cookies.username){return res.send("权限不对",406)};
            return showcase.remove(function(err){
                if(!err){
                    console.log('removed');
                    return res.send('');
                } else {
                     console.log(err);
                }
            });
        });
    });

};
