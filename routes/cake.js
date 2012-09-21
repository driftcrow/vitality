var Models = require('../models');

module.exports = function(app){
    // list
    app.get('/api/cakes', function(req, res){
        return Models.Cake.find(function( err, cakes){
            if(!err){
                return res.send(cakes);
            } else {
                return console.log(err);
            }
        });
    });

    // create new
    app.post('/api/cakes', function(req, res){
        var cake;
        console.log("POST: ");
        console.log(req.body);
        cake = new Models.Cake({
            title: req.body.title,
            description: req.body.description,
            cover: req.body.cover
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

    // update
    app.put('/api/cakes/:id', function(req, res){
        console.log(req.params.id);
        console.log(req.params);
        return Models.Cake.findById(req.params.id, function(err, cake){
            cake.title = req.body.title;
            cake.description = req.body.description;
            cake.cover = req.body.cover;

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
    app.delete('/api/cakes/:id',function(req,res){
        return Models.Cake.findById( req.params.id, function(err, cake){
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
