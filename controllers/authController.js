//controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.mostrarLogin = (req, res) => {
  res.render('login', { error: null });
};

exports.mostrarRegistro = (req, res) => {
  res.render('registro', { error: null });
};

exports.registrarUsuario = async (req, res) => {
  const { nombre, email, contraseña } = req.body;
  try {
    const hash = await bcrypt.hash(contraseña, 10);
    await User.create({ nombre, email, contraseña: hash });
    res.redirect('/login');
  } catch (error) {
    res.render('registro', { error: 'Error al registrar. ¿Ya existe el correo?' });
  }
};

exports.iniciarSesion = async (req, res) => {
  const { email, contraseña } = req.body;
  const usuario = await User.findOne({ email });
  if (!usuario) return res.render('login', { error: 'Usuario no encontrado' });

  const valido = await bcrypt.compare(contraseña, usuario.contraseña);
  if (!valido) return res.render('login', { error: 'Contraseña incorrecta' });

  req.session.usuarioId = usuario._id;
  req.session.usuarioNombre = usuario.nombre;

  req.session.save((err) => {
    if (err) {
      console.error('Error al guardar la sesión:', err);
      return res.render('login', { error: 'Error al iniciar sesión' });
    }
    res.redirect('/productos');
  });
};

exports.cerrarSesion = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};


