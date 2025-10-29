// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  precio: {
    type: Number,
    required: true,
    min: 0
  },
  descripcion: {
    type: String,
    required: true,
    trim: true
  },
  imagen: {
    type: String // nombre del archivo de imagen
  }
}, {
  timestamps: true // agrega campos createdAt y updatedAt automáticamente
});

module.exports = mongoose.model('Product', productSchema);

