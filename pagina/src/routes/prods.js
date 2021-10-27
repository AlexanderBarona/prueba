const router= require('express').Router();
const Prod =require('../models/Producto');




router.get('/add', (req, res)=>{
    res.render('prod/nuevoprod');
});
 router.post('/prod/nuevoprod', async (req, res)=>{
    const{descripcion, categoria, valorUnitario, estado}= req.body;
    const errors = [];
    if (!descripcion) {
        errors.push({text: 'por favor ingrese la descripción del producto'});
    }

    if (!categoria) {
        errors.push({text: 'por favor ingrese la categoría del producto'});
    }
    if (!valorUnitario) {
        errors.push({text: 'por favor ingrese el valor unitario del producto'});

    }
    if (!estado) {
        errors.push({text: 'por favor ingrese el estadao del producto'});
    }
    if (errors.length>0) {
        res.render('prod/nuevoprod', {
            errors,
            descripcion,
            categoria,
            valorUnitario,
            estado
        });

    } else{
        const nuevoProducto= new Prod({descripcion,categoria,valorUnitario,estado});
        await nuevoProducto.save();
        req.flash('success_msg','Producto Creado Satisfactoriamente');
        res.redirect('/listado');
    }
    
});

router.get('/listado',  async(req, res)=>{
    
const lista = await Prod.find().lean();
    
  res.render('prod/listaproductos', { lista });
 
});

router.get('/edit/:id',  async (req, res) => {
    const prodamod= await Prod.findById(req.params.id).lean();
    res.render('prod/editprod', {prodamod});
});

router.put('/prod/editprod/:id',  async (req, res) => {
    const{descripcion, categoria, valorUnitario, estado} = req.body;
    await Prod.findByIdAndUpdate(req.params.id,  {descripcion, categoria, valorUnitario, estado}).lean();
    req.flash('success_msg','Producto Editado Satisfactoriamente');
    res.redirect('/listado');
});



router.delete('/delete/:id',  async (req, res) => {
    

   await Prod.findByIdAndDelete(req.params.id);
    req.flash('success_msg','Producto Eliminado Satisfactoriamente');
    res.redirect('/listado');
  

});




module.exports= router; 