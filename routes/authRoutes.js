//routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validarRegistro, validarLogin } = require('../middleware/validaciones');
const { validationResult } = require('express-validator');

router.get('/login', authController.mostrarLogin);

router.post('/login', validarLogin, (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.render('login', { error: errores.array()[0].msg });
  }
  next();
}, authController.iniciarSesion);

router.get('/registro', authController.mostrarRegistro);

router.post('/registro', validarRegistro, (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.render('registro', { error: errores.array()[0].msg });
  }
  next();
}, authController.registrarUsuario);

router.get('/logout', authController.cerrarSesion);

module.exports = router;