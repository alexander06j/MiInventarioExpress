//index.js
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const multer = require('multer');

// Configuración de sesiones (una sola vez)
const sessionMiddleware = session({
  secret: 'mi_clave_secreta',
  resave: false,
  saveUninitialized: false
});
app.use(sessionMiddleware);
io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});

// Socket.io
io.on('connection', (socket) => {
  const session = socket.request.session;
  console.log('Sesión recibida en Socket.io:', session); // ✅ log completo

  const usuarioNombre = session?.usuarioNombre || 'Invitado';

  console.log(`Usuario conectado: ${usuarioNombre}`);

  socket.on('chat message', (msg) => {
    console.log(`Mensaje recibido de ${usuarioNombre}: ${msg}`); // ✅ log de mensaje
    io.emit('chat message', { usuarioNombre, msg });
  });
});


// MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/miinventario', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión:', err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use((req, res, next) => {
  res.locals.usuarioId = req.session.usuarioId;
  res.locals.usuarioNombre = req.session.usuarioNombre;
  next();
});
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).send('Error de carga: archivo demasiado grande');
  } else if (err) {
    res.status(400).send(`Error: ${err.message}`);
  } else {
    next();
  }
});

// Rutas
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
app.use('/', authRoutes);
app.use('/', productRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('MiInventarioExpress está funcionando');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

