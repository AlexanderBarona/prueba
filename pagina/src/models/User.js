const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt= require('bcryptjs');
const UserSchema = new Schema ({
    nombre: {type: String, required: true},
    email: { type: String, required: true},
    password:{type: String},
    rol: {type: String, default:'  '},
    estado:{type: String, default:'pendiente'},
    fecha:{type: Date, default: Date.now }
});

UserSchema.methods.encryptPassword= async (password) =>{
const salt = await bcrypt.genSalt(10);
const hash = bcrypt.hash(password,salt);
return hash;
};

UserSchema.methods.matchPwd = async function (password){
     return await bcrypt.compare(password,this.password);
}


module.exports= mongoose.model('User',UserSchema);