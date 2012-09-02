
/*
 * Showcase controller
 */

exports.index = function(req, res){
  res.render('showcase/index', { title: 'showcase' });
};
