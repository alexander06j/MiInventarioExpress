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
    const { nombre, precio, descripcion } = req.body;
    const imagen = req.file ? req.file.filename : null;

    await Product.create({ nombre, precio, descripcion, imagen });
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
    const producto = await Producto.findById(id);
    if (!producto) {
      return res.redirect('/productos');
    }
    res.render('editarProducto', { producto });
  } catch (error) {
    res.redirect('/productos');
  }
};


exports.actualizarProducto = async (req, res) => {
  const { nombre, precio, descripcion } = req.body;
  const imagen = req.file ? req.file.filename : req.body.imagenActual;
  await Product.findByIdAndUpdate(req.params.id, { nombre, precio, descripcion, imagen });
  res.redirect('/productos');
};

exports.eliminarProducto = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/productos');
};
