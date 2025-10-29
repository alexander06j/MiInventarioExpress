// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const multer = require('multer');

const app = express();

//  Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/miinventario', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión:', err));

//  Configuración de sesiones
app.use(session({
  secret: 'mi_clave_secreta',
  resave: false,
  saveUninitialized: false
}));

//  Middleware para parsear datos del formulario
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//  Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//  Motor de vistas: Handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

//  Middleware para mostrar el usuario en todas las vistas
app.use((req, res, next) => {
  res.locals.usuarioId = req.session.usuarioId;
  next();
});

//  Capturar errores de Multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).send('Error de carga: archivo demasiado grande');
  } else if (err) {
    res.status(400).send(`Error: ${err.message}`);
  } else {
    next();
  }
});

//  Rutas
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/', authRoutes);
app.use('/', productRoutes);

//  Ruta de prueba
app.get('/', (req, res) => {
  res.send('MiInventarioExpress está funcionando');
});

//  Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
