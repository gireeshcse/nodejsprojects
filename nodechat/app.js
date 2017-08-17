var express = require('express');
var app = express();

var errorHandlers = require('./middleware/errorhandlers');
//Express comes with its own logging middleware, which is express.logger().
var log = require('./middleware/log');
app.use(log.logger);
//static files such as css js etc
app.use(express.static(__dirname + '/static'));

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
app.get('/login', routes.login);
app.post('/login', routes.loginProcess);
app.get('/chat', routes.chat);
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


app.listen(3000);
console.log("App server running on port 3000");

//Every request makes its way through the middleware layer.
//To add a middleware layer to Express, we use app.use(), which allows us to take a middleware function.