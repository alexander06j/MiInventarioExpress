// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const app = express();

// Configuración de puerto
const PORT = process.env.PORT || 3000;

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/miinventario', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión:', err));

// Configuración de sesiones
app.use(session({
  secret: 'mi_clave_secreta',
  resave: false,
  saveUninitialized: false
}));

// Middleware para parsear datos
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Motor de vistas: Handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('MiInventarioExpress está funcionando');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

