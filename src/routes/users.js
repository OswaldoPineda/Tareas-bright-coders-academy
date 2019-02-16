const express = require('express');
const routes = express.Router();

routes.get('/users/signin',(req,res)=>{
    res.render('/users/signin.hbs');
});

routes.get('/users/signup', (req,res)=>{
    res.render('/users/signup.hbs');
});


module.exports = routes;