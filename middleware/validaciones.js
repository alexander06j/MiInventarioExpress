// middleware/validaciones.js
const { body } = require('express-validator');

exports.validarRegistro = [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('email').isEmail().withMessage('Debe ser un correo válido'),
  body('contraseña').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

exports.validarLogin = [
  body('email').isEmail().withMessage('Debe ser un correo válido'),
  body('contraseña').notEmpty().withMessage('La contraseña es obligatoria')
];

exports.validarProducto = [
  body('nombre').notEmpty().withMessage('El nombre del producto es obligatorio'),
  body('precio').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
  body('descripcion').optional().isLength({ max: 200 }).withMessage('La descripción no debe superar los 200 caracteres')
];
