const router= require('express').Router();
const Prod =require('../models/Producto');




router.get('/addventa', (req, res)=>{
    res.render('ventas/nuevaventa');
});
 router.post('/ventas/nuevaventa', async (req, res)=>{
    const{nombreCliente, nId, valorTotal, state}= req.body;
    const errors = [];
    if (!nombreCliente) {
        errors.push({text: 'por favor ingrese el Nombre del Cliente'});
    }

    if (!nId) {
        errors.push({text: 'por favor ingrese el DI del Cliente'});
    }
    if (!valorTotal) {
        errors.push({text: 'por favor ingrese el valor Total de la venta'});

    }
    if (!state) {
        errors.push({text: 'por favor ingrese el estadao de la venta'});
    }
    if (errors.length>0) {
        res.render('/ventas/nuevaventa', {
            errors,
            nombreCliente,
            nId,
            valorTotal,
            state
        });

    } else{
        const nuevaVenta= new Ven({nombreCliente,
            nId,
            valorTotal,
            state});
        await nuevaVenta.save();
        req.flash('success_msg','Producto Creado Satisfactoriamente');
        res.redirect('/listado');
    }
    
});

router.get('/listaventas',  async(req, res)=>{
    
const lista = await Prod.find().lean();
    
  res.render('ventas/listaventas', { lista });
 
});

router.get('/editventa/:id',  async (req, res) => {
    const prodamod= await Prod.findById(req.params.id).lean();
    res.render('ventas/editventa', {ventamod});
});

router.put('ventas/editventa/:id',  async (req, res) => {
    const{nombreCliente,
        nId,
        valorTotal,
        state} = req.body;
    await Prod.findByIdAndUpdate(req.params.id,  {nombreCliente,
        nId,
        valorTotal,
        state}).lean();
    req.flash('success_msg','Venta Editada Satisfactoriamente');
    res.redirect('/listaventas');
});



router.delete('/deleteventa/:id', async (req, res) => {
    await Prod.findByIdAndDelete(req.params.id);
    req.flash('success_msg','Venta Eliminada Satisfactoriamente');
    res.redirect('/listaventas');
});




module.exports= router; 