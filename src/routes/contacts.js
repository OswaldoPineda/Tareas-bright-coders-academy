const express = require('express');
const routes = express.Router();

routes.get('/ contacts', (req,res)=>{
    res.send('contactos desde la BD');
});

module.exports = routes;