const mongoose = require('mongoose');

const Schema = mongoose.Schema();

// Conectamos mongoose y configuramos su funcionamiento basico
mongoose.connect('mongodb://oswaldopineda:Carlos1234579@cluster0-shard-00-00-x4sqb.mongodb.net:27017,cluster0-shard-00-01-x4sqb.mongodb.net:27017,cluster0-shard-00-02-x4sqb.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',)
.then(db=> console.log('DB is connect...'))
.catch(err=>console.log(err))