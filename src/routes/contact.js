const express = require('express');
const routes = express.Router();

// Requerimos el esquema de mongoose
const Contact = require('../models/Contact');

// Validar la sesion del usuario con el helper auth, le agregaremos esto a las funciones que queramos asegurar que este autenticado para poder acceder a ellas
const {isAuthenticated} = require('../helpers/auth');

// Ruta para agregar nuevo contacto
routes.get('/contact/add',isAuthenticated, (req,res)=>{
    res.render('contact/new-contact.hbs');
});

// Ruta que obtiene contactos desde la DB
routes.get('/contact',isAuthenticated, async (req,res)=>{
    const contacts = await Contact.find({user: req.user.id}).sort({date:'desc'});
    res.render('contact/all-contacts.hbs', {contacts});
});

// Ruta que recibe una peticion post del formulario
routes.post('/contact/new-contact',isAuthenticated,async(req,res)=>{
    const {nombre, numero} = req.body;
    const errors = [];
    if(!nombre) {
        errors.push({text:'Inserte un nombre...'})
    }
    if(!numero) {
        errors.push({text:'Inserte un numero valido...'})
    }
    if(errors.length>0) {
        res.render('contact/new-contact.hbs', {
            errors,
            nombre,
            numero
        })
    } else {
        const newContact = new Contact({nombre, numero});
        newContact.user = req.user.id;
        await newContact.save();
    }
});

// Ruta para editar el contacto seleccionado
routes.get('/contact/edit/:id',isAuthenticated, async(req,res)=>{
    const contact = await Contact.findById(req.params.id)
    res.render('contact/edit-contact.hbs',{contact});
});

// Metodo put para editar el contacto desde la DB
routes.put('/contact/edit-contact/:id',isAuthenticated, async(req,res) =>{
    const {nombre,numero} = req.body;
    await Contact.findByIdAndUpdate(req.params.id, {nombre,numero});
    req.flash('sucess_msg','Nota editada satisfactoriamente...')
    res.redirect('/contact');
});

// Metodo DELETE para eliminar un contacto de la BD
routes.delete('/contact/delete/:id',isAuthenticated,async (req,res)=>{
    await Contact.findByIdAndDelete(req.params.id);
    req.flash('sucess_msg','Nota eliminada satisfactoriamente...')
    res.redirect('/contact');
});

module.exports = routes;