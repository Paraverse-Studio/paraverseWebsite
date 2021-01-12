const express = require('express');
const app = express();

//middleware (runs before request/response)
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

//routes
app.get('/', (req, res)=>{
    res.redirect('/index');
})
app.get('/index', (req, res)=>{
    res.render('index');
})
app.get('/apps', (req, res)=>{
    res.render('apps');
})
app.get('/team', (req, res)=>{
    res.render('team');
})
app.get('/blog', (req, res)=>{
    res.render('blog');
})
app.get('/account', (req, res)=>{
    res.render('account');
})
app.get('/play', (req, res)=>{
    res.render('play');
})
app.get('/contact', (req, res)=>{
    res.render('contact');
})
app.get('/privacy', (req, res)=>{
    res.render('privacy');
})

app.listen(3000, ()=>console.log("listening to port 3000"));