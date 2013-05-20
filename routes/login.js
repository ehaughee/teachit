
/*
 * GET login page.
 */

exports.index = function(req, res) {
  res.render('login');
};

exports.post = function(req, res) {
    console.log("Received POST to /login");
    // TODO:
    // 1. auth user
    req.session.user_id = 1;
    res.redirect('/');
    // var post = req.body;
    // if (post.user == 'john' && post.password == 'johnspassword') {
    //   req.session.user_id = johns_user_id_here;
    //   res.redirect('/');
    // } else {
    //   res.send('Bad user/pass');
    // }
    // 2. render home page
    res.render('index');
};

exports.logout = function(req, res) {
    // TODO:
    // 1. Logout
    delete req.session.user_id;
    // 2. Redirect to the home page and display a flash
    res.redirect('/');
};