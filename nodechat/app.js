var express = require('express');
var app = express();
var config = require('./config');
var errorHandlers = require('./middleware/errorhandlers');
//Express comes with its own logging middleware, which is express.logger().
var log = require('./middleware/log');
app.use(log.logger);
var util = require('./middleware/utilities');


//static files such as css js etc
app.use(express.static(__dirname + '/static'));
//with all the other requires at the top of the file


var cookieParser = require('cookie-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
app.use(cookieParser('secret'));
//The express session uses cookies, so the cookie object needs to be present before it can use the session.
//app.use(session({secret: 'secret'})); secret and resave required
//The secret option uses the string we pass in to create a hash of our session ID,
//so we can tell if someone has tried to tamper with our cookie (also known as a
//request forgery).
//app.use(session({secret:'samplekey', saveUninitialized: true, resave: true}));
//for storing sessions in redis
app.use(session({
secret: 'secret',
saveUninitialized: true,
resave: true,
store: new RedisStore(
{url: config.redisUrl})
})
);

//POST data
//variable declarations
var bodyParser = require('body-parser');
//middleware stack right after session
//variable declarations
var csrf = require('csurf');
//middleware stack
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(csrf());
app.use(util.csrf);
app.use(util.authenticated);
//session page count
app.use(function(req, res, next){
if(req.session.pageCount)
req.session.pageCount++;
else
req.session.pageCount = 1;
next();
});
//variable declarations
var flash = require('connect-flash');
//middleware stack after session, but before the routes
app.use(flash());
app.use(util.templateRoutes);

//Embedded JavaScript (EJS)
app.set('view engine', 'ejs');

//all the other variables declarations at the top of app.js
var partials = require('express-partials');
app.use(partials());
//all other middleware functions

//after variable declarations
app.set('view options', {defaultLayout: 'layout'});
//but before the middleware

var routes = require('./routes');

app.get('/', routes.index);
//app.get('/login', routes.login);
//app.post('/login', routes.loginProcess);
app.get('/chat', [util.requireAuthentication], routes.chat);
//app.get('/logout', routes.logOut);
app.get(config.routes.login, routes.login);
app.post(config.routes.login, routes.loginProcess);
app.get(config.routes.logout, routes.logOut);
// to explicitly throw an error
app.get('/error', function(req, res, next){
next(new Error('A contrived error'));
});
//order is important.If this line is reached while matching routes then no other routes are available
app.use(errorHandlers.error);
app.use(errorHandlers.notFound);
/*
//To accept any request
app.get('*',function(req, res){
res.send('Express Response');
});
*/


app.listen(config.port);
console.log("App server running on port "+config.port);

//Every request makes its way through the middleware layer.
//To add a middleware layer to Express, we use app.use(), which allows us to take a middleware function.