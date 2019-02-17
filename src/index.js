const express = require('express');
const app = express();
const path = require('path');
const exhbs = require('express-handlebars');
const override = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

// Requerimos el archivo de configuracion de la base de datos
require('./database');

// Configuracion del puerto 
app.set('port', process.env.PORT || 3000);

// Configuracion ruta de vistas
app.set('views', path.join(__dirname,'views'));

// Configuracion de vistas con handlebars
// -configuracion de layout por defecto y su direccion
// -configuracion de direccion de partials y su extencion
app.engine('.hbs', exhbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs'
}));

// Utilizamos el motor de platillas con la configuracion anterior
app.set('view engine', '.hbs');

// Recibimos datos de body
app.use(express.urlencoded({extended:false}));

// Para que los formularios puedan mandar metodos PUT y DELETE 
app.use(override('_method'));

// Configuramos el guardado de usuario atraves de una sesion y sus conf. por defecto
app.use(session({
    secret: 'myapp',
    resave: true,
    saveUninitialized: true
}));

// Para alertas de confirmacion al realizar una accion
app.use(flash());

// Definimos las variables para las alertas al realizar una accion
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// Indicamos donde tenemos la rutas en el servidor
app.use(require('./routes'));
app.use(require('./routes/users'));
app.use(require('./routes/contact'));

// Configurando archivos publicos
app.use(express.static(path.join(__dirname,'public')));




// Inicializacion del servidor
app.listen(app.get('port'), () =>{
    console.log('server listenning in port:',app.get('port'));
});