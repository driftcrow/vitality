
/*
 * GET home page.
 */

exports.login = function(req, res){
  console.log (req.method);
  if (req.method == 'get'){
    console.log (req.method);
    res.render('login', { title: 'Express' });
  }
  else{
    console.log (req.method);
    res.render ('index');
  }
};
