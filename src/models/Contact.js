const mongoose = require('mongoose');
const {Schema} = mongoose;

const ContactSchema = new Schema({
    nombre: {type: String, required: true},
    numero: {type: Number, required: true},
    date: {type: Date, default: Date.now},
    user: {type: String}
});

module.exports = mongoose.model('Contact', ContactSchema);