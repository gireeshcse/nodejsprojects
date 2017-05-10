var express = require('express');
var app = express();
app.listen(process.env.PORT||3000);

//To serve static files such as images, CSS files, and JavaScript files, 
//use the express.static built-in middleware function in Express.
app.use(express.static('public'));

//view engine 
app.set('view engine','ejs');

console.log('Server is ready');

app.get('/',function(req,res){
    //index.ejs is rendered which is in views/index.ejs
    res.render('index',{title:'Home Page::Welcome to Static Nodejs Website'});
});
app.get('/index.html',function(req,res){
    //index.ejs is rendered which is in views/index.ejs
    res.render('index',{title:'Home Page::Welcome to Static Nodejs Website',content:'./common/home'});
});