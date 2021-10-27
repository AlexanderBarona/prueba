const mongoose = require('mongoose');
const { Schema } = mongoose;

const VentaSchema = new Schema ({
    valorTotal:{ type: Number, required: true },
    fecha:{ type: Date, default: Date.now},
    nombreCliente:{type:String,required:true},
    nId:{type:Number,required:true},
    state:{type:String,required:true}
});

module.exports= mongoose.model('prod',VentaSchema)