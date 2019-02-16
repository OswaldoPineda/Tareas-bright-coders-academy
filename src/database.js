const mongoose = require('mongoose');

const Schema = mongoose.Schema();

// Conectamos mongoose y configuramos su funcionamiento basico
mongoose.connect('mongodb://localhost/contacts-db-app', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
.then(db=> console.log('DB is connect...'))
.catch(err=>console.log(err))