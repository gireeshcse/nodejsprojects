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
    res.render('index',{title:'Home Page::Welcome to Static Nodejs Website',content:'home'});
});
app.get('/index.html',function(req,res){
    //index.ejs is rendered which is in views/index.ejs
    res.render('index',{title:'Home Page::Welcome to Static Nodejs Website',content:'home'});
});

app.get('/about.html',function(req,res){
    //index.ejs is rendered which is in views/index.ejs
    res.render('index',{title:'About Page::Welcome to Static Nodejs Website',content:'about'});
});

app.get('/services.html',function(req,res){
    //index.ejs is rendered which is in views/index.ejs
    res.render('index',{title:'Services Page::Welcome to Static Nodejs Website',content:'services'});
});

app.get('/portfolio.html',function(req,res){
    //index.ejs is rendered which is in views/index.ejs
    res.render('index',{title:'Portfolio Page::Welcome to Static Nodejs Website',content:'portfolio'});
});
const blogs = [
    {
        id:0,
        title:'Blog post number 1',
        image:'blog1.jpg',
        summary:'Curabitur quis libero leo, pharetra mattis eros. Praesent consequat libero eget dolor convallis vel rhoncus magna scelerisque. Donec nisl ante, elementum eget posuere a, consectetur a metus. Proin a adipiscing sapien. Suspendisse vehicula porta lectus vel semper. Nullam sapien elit, lacinia eu tristique non.posuere at mi. Morbi at turpis id urna ullamcorper ullamcorper.',
        description:
        'Nam tempor velit sed turpis imperdiet vestibulum. In mattis leo ut sapien euismod id \
        feugiat mauris euismod. Pellentesque habitant morbi tristique senectus et netus et malesuada fames \
        ac turpis egestas. Phasellus id nulla risus, vel tincidunt turpis. Aliquam a nulla mi, placerat blandit eros.\
In neque lectus, lobortis a varius a, hendrerit eget dolor. Fusce scelerisque, sem ut viverra sollicitudin, \
est turpis blandit lacus, in pretium lectus sapien at est. Integer pretium ipsum sit amet dui feugiat vitae \
dapibus odio eleifend.'
    },
    {
        id:1,
        title:'Blog post number 2',
        image:'blog2.jpg',
        summary:'Curabitur quis libero leo, pharetra mattis eros. Praesent consequat libero eget dolor convallis vel rhoncus magna scelerisque. Donec nisl ante, elementum eget posuere a, consectetur a metus. Proin a adipiscing sapien. Suspendisse vehicula porta lectus vel semper. Nullam sapien elit, lacinia eu tristique non.posuere at mi. Morbi at turpis id urna ullamcorper ullamcorper.',
        description:
        'Nam tempor velit sed turpis imperdiet vestibulum. In mattis leo ut sapien euismod id \
        feugiat mauris euismod. Pellentesque habitant morbi tristique senectus et netus et malesuada fames \
        ac turpis egestas. Phasellus id nulla risus, vel tincidunt turpis. Aliquam a nulla mi, placerat blandit eros.\
In neque lectus, lobortis a varius a, hendrerit eget dolor. Fusce scelerisque, sem ut viverra sollicitudin, \
est turpis blandit lacus, in pretium lectus sapien at est. Integer pretium ipsum sit amet dui feugiat vitae \
dapibus odio eleifend.'
    },
    {
        id:2,
        title:'Blog post number 3',
        image:'blog1.jpg',
        summary:'Curabitur quis libero leo, pharetra mattis eros. Praesent consequat libero eget dolor convallis vel rhoncus magna scelerisque. Donec nisl ante, elementum eget posuere a, consectetur a metus. Proin a adipiscing sapien. Suspendisse vehicula porta lectus vel semper. Nullam sapien elit, lacinia eu tristique non.posuere at mi. Morbi at turpis id urna ullamcorper ullamcorper.',
       description:
        'Nam tempor velit sed turpis imperdiet vestibulum. In mattis leo ut sapien euismod id \
        feugiat mauris euismod. Pellentesque habitant morbi tristique senectus et netus et malesuada fames \
        ac turpis egestas. Phasellus id nulla risus, vel tincidunt turpis. Aliquam a nulla mi, placerat blandit eros.\
In neque lectus, lobortis a varius a, hendrerit eget dolor. Fusce scelerisque, sem ut viverra sollicitudin, \
est turpis blandit lacus, in pretium lectus sapien at est. Integer pretium ipsum sit amet dui feugiat vitae \
dapibus odio eleifend.'
    },
    {
        id:3,
        title:'Blog post number 4',
        image:'blog2.jpg',
        summary:'Curabitur quis libero leo, pharetra mattis eros. Praesent consequat libero eget dolor convallis vel rhoncus magna scelerisque. Donec nisl ante, elementum eget posuere a, consectetur a metus. Proin a adipiscing sapien. Suspendisse vehicula porta lectus vel semper. Nullam sapien elit, lacinia eu tristique non.posuere at mi. Morbi at turpis id urna ullamcorper ullamcorper.',
        description:
        'Nam tempor velit sed turpis imperdiet vestibulum. In mattis leo ut sapien euismod id \
        feugiat mauris euismod. Pellentesque habitant morbi tristique senectus et netus et malesuada fames \
        ac turpis egestas. Phasellus id nulla risus, vel tincidunt turpis. Aliquam a nulla mi, placerat blandit eros.\
In neque lectus, lobortis a varius a, hendrerit eget dolor. Fusce scelerisque, sem ut viverra sollicitudin, \
est turpis blandit lacus, in pretium lectus sapien at est. Integer pretium ipsum sit amet dui feugiat vitae \
dapibus odio eleifend.'
    }
];
app.get('/blog.html',function(req,res){
    //index.ejs is rendered which is in views/index.ejs
    res.render('index',{title:'blog Page::Welcome to Static Nodejs Website',content:'blog',blogs:blogs});
});
app.get('/blog/:id',function(req,res){
    //index.ejs is rendered which is in views/index.ejs
    res.render('index',{title:blogs[req.params.id].title,content:'single-blog',blog:blogs[req.params.id]});
});

app.get('/contact.html',function(req,res){
    //index.ejs is rendered which is in views/index.ejs
    res.render('index',{title:'Contact Page::Welcome to Static Nodejs Website',content:'contact'});
});
app.get('/:404',function(req,res){
    //index.ejs is rendered which is in views/index.ejs
    res.render('index',{title:'Contact Page::Welcome to Static Nodejs Website',content:'404'});
});