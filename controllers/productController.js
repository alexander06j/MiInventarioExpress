// controllers/productController.js
const Product = require('../models/Product');

exports.listarProductos = async (req, res) => {
  const productos = await Product.find();
  res.render('productos', { productos });
};

exports.mostrarFormulario = (req, res) => {
  res.render('formulario');
};

exports.crearProducto = async (req, res) => {
  try {
    const { nombreProducto, precio, descripcion } = req.body;
    const imagen = req.file ? req.file.filename : null;

    await Product.create({ nombreProducto, precio, descripcion, imagen });
    res.redirect('/productos');
  } catch (error) {
    res.render('formulario', {
      error: error.message,
      producto: req.body
    });
  }
};

exports.editarProducto = async (req, res) => {
  const producto = await Product.findById(req.params.id);
  res.render('formulario', { producto });
};

exports.mostrarEdicion = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Product.findById(id);
    console.log('Producto encontrado:', producto); // ← ¿esto se muestra?
    if (!producto) return res.redirect('/productos');
    res.render('formulario', { producto });
  } catch (error) {
    console.error('Error al buscar producto:', error);
    res.redirect('/productos');
  }
};

exports.actualizarProducto = async (req, res) => {
  const { nombreProducto, precio, descripcion } = req.body;
  const imagen = req.file ? req.file.filename : req.body.imagenActual;
  await Product.findByIdAndUpdate(req.params.id, { nombreProducto, precio, descripcion, imagen });
  res.redirect('/productos');
};

exports.eliminarProducto = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/productos');
};


