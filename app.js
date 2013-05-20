
/**
 * Module dependencies.
 */

var express = require('express'),
    home = require('./routes/home'),
    login = require('./routes/login'),
    http = require('http'),
    path = require('path');

var app = express();

// All environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', { layout: false });

// Middleware
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('SPHOKJHcE67BmDduld3DL1IsMeHOFC3aNSurX1TCGJIT85U96d7zlFeJQ06YBZz'));
app.use(express.session());
// TODO: Move to external file and require
app.use(function (req, res, next) {
    res.locals({
        isAuthenticated: function () {
            return typeof req.session.user_id !== 'undefined';
        }
    });

    next();
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
// TODO: Move to external file and require
function checkAuth(req, res, next) {
  if (!req.session.user_id) {
    // TODO: Display permissions/login message
    res.redirect('/login');
  } else {
    next();
  }
}

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Default route
app.get('/', home.index);

// Login routes
app.get('/login', login.index);
app.post('/login', login.post);
app.get('/logout', login.logout);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
