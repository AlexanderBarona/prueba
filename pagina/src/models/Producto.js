const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProdSchema = new Schema ({
    descripcion: {type: String, required: true},
    categoria: { type: String, required: true},
    valorUnitario:{type: Number, required: true},
    estado: {type: String, required: true},
    fecha:{type: Date, default: Date.now }
});

module.exports= mongoose.model('prod',ProdSchema)