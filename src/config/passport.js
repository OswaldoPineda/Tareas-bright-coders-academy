const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

// Definimos la estrategia de autenticacion con passport y le indicamos que es de  
// manera lcoal, despues consulltamos la BD para verificar que el usuario este 
// registrado 
passport.use(new LocalStrategy({
    usernameField: 'email'
  }, async (email, password, done) => {
    const user = await User.findOne({email: email});
    if (!user) {
      return done(null, false, { message: 'Usuario no encontrado...' });
    } else {
      const match = await user.matchPassword(password);
      if(match) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Contrasenia incorreacta...' });
      }
    }
  
  }));

// Almacenamos su sesion temporalmente
passport.serializeUser((user, done) => {
    done(null, user.id);
  });
// Si hay un usuario en la sesion lo busca por su id y manejamos el error o
// resultado de esa manera ya que asi lo indica la documentacion
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });