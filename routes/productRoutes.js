// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/productController');
const { validarProducto } = require('../middleware/validaciones');
const { validationResult } = require('express-validator');

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

//Validacion de tipo y tamaño
const fileFilter = (req, file, cb) => {
  const tiposPermitidos = ['image/jpeg', 'image/png', 'image/jpg'];
  if (tiposPermitidos.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes JPEG, JPG y PNG'), false);
  }
};

//proteger Rutas
function verificarSesion(req, res, next) {
  if (req.session.usuarioId) {
    next();
  } else {
    res.redirect('/login');
  }
}


router.get('/chat', verificarSesion, (req, res) => {
  res.render('chat');
});



// Rutas
router.get('/productos', verificarSesion, productController.listarProductos);
router.get('/productos/nuevo', verificarSesion, productController.mostrarFormulario);


router.post('/productos', verificarSesion, upload.single('imagen'), validarProducto, (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.render('formulario', { error: errores.array()[0].msg });
  }
  next();
}, productController.crearProducto);

router.get('/productos/editar/:id', verificarSesion, productController.mostrarEdicion);
router.post('/productos/actualizar/:id', verificarSesion, upload.single('imagen'), validarProducto, (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.render('formulario', {
      error: errores.array()[0].msg,
      producto: { ...req.body, _id: req.params.id }
    });
  }
  next();
}, productController.actualizarProducto);

router.get('/productos/eliminar/:id', verificarSesion, productController.eliminarProducto);

module.exports = router;