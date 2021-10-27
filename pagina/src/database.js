
require('dotenv').config();
const mongoose= require('mongoose');
const URI = process.env.MONGODB_URI;

mongoose.connect(URI) 
//mongoose.connect(URI)

.then(db=> console.log('Conectado a la DB Gwen'))
.catch(err=> console.error(err));