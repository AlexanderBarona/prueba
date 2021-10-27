const router= require('express').Router();

router.get('/', (req, res)=>{
    res.render('users/signin');
});

router.get('/about', (req, res)=>{
    res.render('about');
});

router.get('/productos', (req, res)=>{
    res.render('admprod');
});


router.get('/ventas', (req, res)=>{
    res.render('admventas');
});
router.get('/verusuarios', (req, res)=>{
    res.render('adminusers');
});





module.exports= router;