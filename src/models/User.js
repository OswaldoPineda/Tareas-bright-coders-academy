const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs');


const UserSchema = new Schema({
    nombre: {type:String,required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
    date:{type:Date,default:Date.now}
});

// Metodo desde el Schema para cifrar la contrasenia
UserSchema.methods.encryptPassword = async(password) =>{
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password,salt);
    return hash;
};

// Este metodo es para desencriptar la contrasenia
// en este metodo no usamos arrow functions ya que requerimos que un elemento de la // funcion haga referencia al UserSchema
UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password,this.password);
} 


module.exports =  mongoose.model('User', UserSchema);