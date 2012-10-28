var Models = require('../models');
var requireLogin = require('./help').requireLogin;

module.exports = function(app){
    // list of mine
    app.get('/api/topics',requireLogin, function(req, res){
        return Models.Topic.find({author_id:req.cookies.username}).sort({'order':-1}).exec(function( err, topics){
            if(!err){
                return res.send(topics);
            } else {
                return console.log(err);
            }
        });
    });

    // create new
    app.post('/api/topics', requireLogin,function(req, res){
        var topic;
        topic = new Models.Topic({
            title: req.body.title,
            content: req.body.content,
            cakes: req.body.cakes,
            author_id: req.body.author_id
        });
        topic.save(function( err){
            if(!err){

                return res.send('created');
            } else {
                return console.log(err);
            }
        });
        return res.send(topic);
    });

    //get info
    app.get('/api/topics/:id', function(req,res){
        return Models.Topic.findById( req.params.id, function(err, topic){
            if(!err){
                return res.send(topic);
            } else {
                return console.log(err);
            }
        });
    });

    // update
    app.put('/api/topics/:id',requireLogin, function(req, res){
        return Models.Topic.findById(req.params.id, function(err, topic){
            topic.title = req.body.title;
            topic.content = req.body.content;
            topic.cakes= req.body.cakes;

            if(topic.author_id != req.cookies.username){return res.send("权限不对",406)};

            return topic.save(function(err){
                if (!err){
                    console.log('updated');
                } else {
                    console.log(err);
                }
                return res.send(topic);
            });
        });
    });

    // update-order
    app.put('/api/topics/:id/update-order',requireLogin, function(req, res){
        return Models.Topic.findById(req.params.id, function(err, topic){
            topic.order = req.body.order;
            if(topic.author_id != req.cookies.username){return res.send("权限不对",406)};

            return topic.save(function(err){
                if (!err){
                    console.log('updated-order');
                } else {
                    console.log(err);
                }
                return res.send(topic);
            });
        });
    });

    // delete id
    app.delete('/api/topics/:id',requireLogin,function(req,res){
        return Models.Topic.findById( req.params.id, function(err, topic){
            if(topic.author_id != req.cookies.username){return res.send("权限不对",406)};
            return topic.remove(function(err){
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
