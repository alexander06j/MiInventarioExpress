# MiInventarioExpress

Aplicación web para la gestión de productos con autenticación de usuarios y chat en tiempo real, desarrollada con Node.js, Express, MongoDB y Socket.io.

---

## Información del Estudiante

- **Nombre:** Jostin Matamoros
- **Carrera:** Software
- **Materia:** Programación Web.
- **Docente:** Jose Roberto Jaime Carriel.
- **Fecha de inicio:** 27/10/2025

---

## Objetivo del Proyecto

Desarrollar una aplicación web funcional y segura que permita:

- Registrar, consultar, editar y eliminar productos (CRUD)
- Autenticación de usuarios con sesiones
- Carga de imágenes para productos
- Comunicación en tiempo real mediante chat entre usuarios autenticados

---

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- Express-session
- Bcrypt
- Multer
- Express-validator
- Socket.io
- Handlebars (HBS)
- Dotenv

---

##  Estructura del Proyecto (hasta el paso 2)
MiInventarioExpress/ 
├── index.js 
├── package.json 
├── package-lock.json 
├── .gitignore


---

##  Instrucciones básicas de uso

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/miinventarioexpress.git
   cd miinventarioexpress
2. npm install (Instala las dependencias)
3. MONGO_URI=mongodb://localhost:27017/miinventario (Crea un archivo .env con la URI de MongoDB)
4. node index.js (Ejecuta el servidor)
5. Abre tu navegador en http://localhost:3000


Estructura del Proyecto (Paso 3)
El proyecto sigue el patrón MVC (Modelo-Vista-Controlador) para mantener una arquitectura organizada y escalable:
├── models/         # Esquemas de Mongoose
├── routes/         # Rutas de Express
├── controllers/    # Lógica de negocio
├── views/          # Plantillas Handlebars (HBS)
├── public/         # Archivos estáticos (CSS, JS, imágenes)
├── uploads/        # Imágenes subidas por los usuarios
├── index.js        # Archivo principal del servidor

CRUD de Productos (Paso 4)
Se implementó un sistema completo de CRUD para productos:
1.Crear: Formulario para añadir nuevos productos
2.Listar: Vista principal con todos los productos registrados
3.Actualizar: Edición de productos existentes
4.Eliminar: Opción para borrar productos

La lógica se gestiona con Express y los datos se almacenan en MongoDB.

Esquema de Producto (Paso 5)
El modelo Producto fue creado con Mongoose, incluyendo los siguientes campos:
-nombre: { type: String, required: true },
-precio: { type: Number, required: true },
-descripcion: { type: String },
-imagen: { type: String } // ruta del archivo subido

Este esquema permite almacenar información básica y una imagen por producto.

Carga de Imágenes con Multer (Paso 6)
Se integró Multer para permitir la carga de imágenes al crear o actualizar productos. La configuración incluye:

-Carpeta de destino: /uploads
-Validación de tipo: solo imágenes (.jpg, .png, .jpeg)
-Validación de tamaño: límite de 2MB
-Las imágenes se almacenan localmente y se muestran en la vista de productos.

Autenticación de Usuarios (Paso 7)
Se implementó un sistema básico de autenticación:
-Registro: Crea un nuevo usuario con nombre, email y contraseña
-Login: Verifica credenciales y crea sesión
-Logout: Cierra sesión y redirige al login

Tecnologías utilizadas:

-bcrypt: para encriptar contraseñas
-express-session: para manejar sesiones de usuario
-Middleware personalizado: protege rutas privadas como /productos


Enlace al repositorio:
https://github.com/alexander06j/MiInventarioExpress.git
