const express = require('express');
const routes = express.Router();
// Requerimos el esquema de Users
const User = require('../models/User');
// Requrimos passport para uso de la sesion de usuario 
const passport = require('passport');

// Ruta donde el usuario puede iniciar sesion
routes.get('/users/signin',(req,res)=>{
    res.render('users/signin.hbs');
});

// Ruta donde el usuario se puede registrar
routes.get('/users/signup', (req,res)=>{
    res.render('users/signup.hbs');
});

// Ruta del metodo POST en la cual el segundo parametro hace uso de la autenticacion de la cinfiguracion que hicimos para passport indicando que la manera en la que se va a autenticar el usuario es "local". Indicamos rutas que tomara segun la respuesta de passport authenticate
routes.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/contact',
    failureRedirect: '/users/signin',
    failureFlash: true
  }));



// Meotodo POST para recibir los datos de la vista signup
routes.post('/users/signup', async(req,res)=>{
    const errors = [];
    const {nombre,email,password,confirm_password} = req.body;
    if(nombre.length<=0||email.length<=0||password.length<=0||confirm_password<=0){
        errors.push({text:'Todos los campos son necesarios...'});
        res.render('users/signup.hbs',{errors,nombre,email,password,confirm_password});
    }
    if( password != confirm_password) {
        errors.push({text: 'Las contrasenias no coinciden...'});
    }
    if (password.length<4) {
        errors.push({text:'La contrasenia debe tener por lo menos 4 caracteres...'});
    }
    if (errors.length>0) {
        res.render('users/signup',{errors,nombre,email,password,confirm_password});
    } else {
        // Validamos que el correo no se encuentre repetido en la BD
        const emailUser = await User.findOne({email:email});
        if(emailUser) {
            req.flash('error_msg', 'El email ya esta registrado...');
            res.redirect('/users/signup');
        } else {
            // Hacemos el cifrado con la contrasenia del formulario desde el metodo del // schema
            const newUser = new User({nombre,email,password});
            newUser.password =  await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'Registro completado exitosamente...');
            res.redirect('/users/signin');
        }
    }
});

module.exports = routes;