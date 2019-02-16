const express = require('express');
const app = express();
const path = require('path');
const exhbs = require('express-handlebars');
const override = require('method-override');
const session = require('express-session');

// Requerimos el archivo de configuracion de la base de datos
require('./database');

// configuracion del puerto 
app.set('port', process.env.PORT || 3000);
// configuracion ruta de vistas
app.set('views', path.join(__dirname,'views'));
// configuracion de vistas con handlebars
// -configuracion de layout por defecto y su direccion
// -configuracion de direccion de partials y su extencion
app.engine('.hbs', exhbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs'
}));
// utilizamos el motor de platillas con la configuracion anterior
app.set('view engine', '.hbs');

// recibimos datos de body
app.use(express.urlencoded({extended:false}));
// Para que los formularios puedan mandar metodos PUT y DELETE 
app.use(override());
// Configuramos el guardado de usuario atraves de una sesion y sus conf. por defecto
app.use(session({
    secret: 'myapp',
    resave: true,
    saveUninitialized: true
}));
// Indicamos donde tenemos la rutas en el servidor
app.use(require('./routes'));
app.use(require('./routes/users'));
app.use(require('./routes/contacts'));
// Configurando archivos publicos
app.use(express.static(path.join(__dirname,'public')));




// inicializacion del servidor
app.listen(app.get('port'), () =>{
    console.log('server listenning in port:',app.get('port'));
});