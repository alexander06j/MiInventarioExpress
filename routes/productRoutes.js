// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/productController');

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Middleware de sesión
function verificarSesion(req, res, next) {
  if (req.session.usuarioId) {
    next();
  } else {
    res.redirect('/login');
  }
}

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

// Rutas
router.get('/productos', verificarSesion, productController.listarProductos);
router.get('/productos/nuevo', verificarSesion, productController.mostrarFormulario);
router.post('/productos', verificarSesion, upload.single('imagen'), productController.crearProducto);
router.get('/productos/editar/:id', verificarSesion, productController.mostrarEdicion);
router.post('/productos/actualizar/:id', verificarSesion, upload.single('imagen'), productController.actualizarProducto);
router.get('/productos/eliminar/:id', verificarSesion, productController.eliminarProducto);


module.exports = router;
