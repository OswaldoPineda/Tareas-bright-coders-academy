const express = require('express');
const routes = express.Router();

routes.get('/', (req,res) =>{
    res.render('index.hbs');
});

routes.get('/about', (req,res)=> {
    res.render('about.hbs')
});




module.exports = routes;