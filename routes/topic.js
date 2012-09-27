var Models = require('../models');

module.exports = function(app){
    // list
    app.get('/api/topics', function(req, res){
        return Models.Topic.find(function( err, topics){
            if(!err){
                return res.send(topics);
            } else {
                return console.log(err);
            }
        });
    });

    // create new
    app.post('/api/topics', function(req, res){
        var topic;
        console.log("POST: ");
        console.log(req.body);
        topic = new Models.Topic({
            title: req.body.title,
            content: req.body.content,
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
    app.put('/api/topics/:id', function(req, res){
        console.log(req.params.id);
        console.log(req.params);
        return Models.Topic.findById(req.params.id, function(err, topic){
            topic.title = req.body.title;
            topic.content = req.body.content;
            topic.images = req.body.images;

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

    // delete id
    app.delete('/api/topics/:id',function(req,res){
        return Models.Topic.findById( req.params.id, function(err, topic){
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
