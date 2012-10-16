var Models = require('../models');
var requireLogin = require('./help').requireLogin;

module.exports = function(app){
    // lists of all public but mine
    app.get('/api/cakes/public',function(req, res){
        return Models.Cake.find({$and:[{publiced:true},{author_id:{$ne:req.cookies.username}}]},function( err, cakes){
            if(!err){
                return res.send(cakes);
            } else {
                return console.log(err);
            }
        });
    });

    // list just mine
    app.get('/api/cakes', requireLogin,function(req, res){
        return Models.Cake.find({author_id: req.cookies.username},function( err, cakes){
            if(!err){
                return res.send(cakes);
            } else {
                return console.log(err);
            }
        });
    });

    // create new
    app.post('/api/cakes', requireLogin, function(req, res){
        var cake;
        console.log("POST: ");
        console.log(req.body);
        cake = new Models.Cake({
            title: req.body.title,
            description: req.body.description,
            cover: req.body.cover,
            publiced: req.body.publiced,
            author_id: req.body.author_id
        });
        cake.save(function( err){
            if(!err){

                return res.send('created');
            } else {
                return console.log(err);
            }
        });
        return res.send(cake);
    });

    //get info
    app.get('/api/cakes/:id', function(req,res){
        return Models.Cake.findById( req.params.id, function(err, cake){
            if(!err){
                return res.send(cake);
            } else {
                return console.log(err);
            }
        });
    });

    // get include topics
    app.get('/api/cakes/:id/topics', function(req, res){
        return Models.Topic.find({cakes: req.params.id},function( err, topics){
            if(!err){
                return res.send(topics);
            } else {
                return console.log(err);
            }
        });
    });

    // update
    app.put('/api/cakes/:id',requireLogin, function(req, res){
        return Models.Cake.findById(req.params.id, function(err, cake){
            cake.title = req.body.title;
            cake.description = req.body.description;
            cake.cover = req.body.cover;
            cake.publiced= req.body.publiced;

            if(cake.author_id != req.cookies.username){return res.send("权限不对",406)};
            return cake.save(function(err){
                if (!err){
                    console.log('updated');
                } else {
                    console.log(err);
                }
                return res.send(cake);
            });
        });
    });

    // delete id
    app.delete('/api/cakes/:id',requireLogin,function(req,res){
        return Models.Cake.findById( req.params.id, function(err, cake){
            if(cake.author_id != req.cookies.username){return res.send("权限不对",406)};
            return cake.remove(function(err){
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
